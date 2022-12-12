import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../components/error-dialog/error-dialog.component";

/**
 * Opens SnackBar with primary style.
 *
 * @param snackBar injected MatSnackBar from component
 * @param message custom message
 */
export function OpenSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, 'OK', {
    duration: 4000,
    panelClass: ['primary-snack-bar']
  });
}

/**
 * Opens SnackBar with warn style.
 *
 * @param snackBar injected MatSnackBar from component
 * @param message custom message
 */
export function OpenWarnSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, 'OK', {
    duration: 8000,
    panelClass: ['warn-snack-bar']
  });
}

/**
 * Opens Dialog for {@link ErrorDialogComponent}.
 *
 * @param dialog injected MatDialog from component
 * @param message custom message
 * @return dialog reference (usage: dialogRef.afterClosed().subscribe(result => {...});)
 */
export function OpenErrorDialog(dialog: MatDialog, message: string): MatDialogRef<ErrorDialogComponent, any> {
  return dialog.open(ErrorDialogComponent, {
    data: message
  });
}


