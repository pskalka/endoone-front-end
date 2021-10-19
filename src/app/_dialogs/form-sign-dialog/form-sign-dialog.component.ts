import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequiredSign } from 'src/app/_models/required-sign';

@Component({
  selector: 'app-form-sign-dialog',
  templateUrl: './form-sign-dialog.component.html',
  styleUrls: ['./form-sign-dialog.component.css']
})
export class FormSignDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Map<number, RequiredSign>) { }

  ngOnInit() {
  }

  getRequiredSigns() : RequiredSign[] {
    return Array.from(this.data.values());
  }

}
