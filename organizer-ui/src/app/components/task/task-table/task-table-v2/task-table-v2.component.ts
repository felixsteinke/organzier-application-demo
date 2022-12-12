import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-table-v2',
  templateUrl: './task-table-v2.component.html',
  styleUrls: ['./task-table-v2.component.scss']
})
export class TaskTableV2Component implements OnInit {

  constructor() {
    // read: https://stackoverflow.com/questions/44945766/use-external-javascript-library-in-angular-application/44946104#44946104

    // let grid = new w2grid({
    //   name: 'grid',
    //   box: '#grid',
    //   show: { lineNumbers: true },
    //   columns: [
    //     { field: 'lname', text: 'Last Name', size: '30%', sortable: true },
    //     { field: 'fname', text: 'First Name', size: '30%', sortable: true },
    //     { field: 'email', text: 'Email', size: '40%', sortable: true },
    //     { field: 'sdate', text: 'Start Date', size: '90px', sortable: true }
    //   ],
    //   records: [
    //     { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '1/3/2012' },
    //     { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'motzart@gmail.com', sdate: '4/3/2012' },
    //     { recid: 3, fname: 'Jin', lname: 'Franson', email: 'franson@gmail.com', sdate: '2/3/2012' },
    //     { recid: 4, fname: 'Frank', lname: 'Ottie', email: 'ottie@gmail.com', sdate: '4/3/2012' },
    //     { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'ksilver@gmail.com', sdate: '5/3/2012' },
    //     { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'fgotya@gmail.com', sdate: '4/4/2012' },
    //     { recid: 7, fname: 'Dimas', lname: 'Welldo', email: 'dimas@gmail.com', sdate: '7/3/2012' },
    //     { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'bahhtee@gmail.com', sdate: '4/3/2012' },
    //     { recid: 9, fname: 'Ottie', lname: 'Welldo', email: 'doe@gmail.com', sdate: '4/3/2012' },
    //     { recid: 10, fname: 'Thomas', lname: 'Bahh', email: 'jane@gmail.com', sdate: '9/4/2012' },
    //     { recid: 11, fname: 'Kolya', lname: 'Doe', email: 'follow@gmail.com', sdate: '4/3/2012' },
    //     { recid: 12, fname: 'Martha', lname: 'Motzart', email: 'joe@gmail.com', sdate: '4/3/2012' }
    //   ]
    // })
  }

  ngOnInit(): void {

  }

}
