import {CollectionViewer, DataSource, SelectionChange} from "@angular/cdk/collections";
import {BehaviorSubject, map, merge, Observable} from "rxjs";
import {FlatTreeControl} from "@angular/cdk/tree";
import {DataMockService} from "../../../services/data-mock.service";
import {Calendar} from "../../../models/calendar";

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(
    public item: Calendar,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {
  }
}

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _dataService: DataMockService,
  ) {
  }

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }

  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const index = this.data.indexOf(node);

    node.isLoading = true;

    this._dataService.getChildCalendarsOfParentId(node.item.id).subscribe({
      next: children => {
        if (!children || children.length === 0) {
          return;
        }
        if (expand) {
          let count = 0;
          // TODO somehow map the async operation so that the "dataChange" gets notified at the end with the "loading false"
          children.map(async calendar => {
            const childNode = new DynamicFlatNode(calendar, node.level + 1, await this._dataService.isCalendarExpandable(calendar.id));
            this.data.splice(index + 1 + count, 0, childNode);
            // notify the change
            this.dataChange.next(this.data);
            count++;
          });
        } else {
          let count = 0;
          for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++) {
            count++;
          }
          this.data.splice(index + 1, count);
          // notify the change
          this.dataChange.next(this.data);
        }
      }
    }).add(() => {
      node.isLoading = false;
    });
  }
}
