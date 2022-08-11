import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrls: ['./confirmation-dialogue.component.css']
})
export class ConfirmationDialogueComponent implements OnInit {

  public confirmMessage:string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogueComponent>
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
  

  ngOnInit(): void {
  }

}
