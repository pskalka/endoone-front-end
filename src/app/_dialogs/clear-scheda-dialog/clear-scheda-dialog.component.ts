import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { POSTService } from '../../post.service';
import { GETService } from '../../get.service';
import { SchedaSlingAttributeBean } from '../../_models/SchedaSlingAttributeBean';
import { JcrHelper } from '../../_helpers/jcrhelper';

export interface ClearSchedaDialogData {
  title: string,
  showApri: boolean,
  showCloseMotivation: boolean
}

@Component({
  selector: 'app-clear-scheda-dialog',
  templateUrl: './clear-scheda-dialog.component.html',
  styleUrls: ['./clear-scheda-dialog.component.css']
})
export class ClearSchedaDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ClearSchedaDialogComponent>,
    public serviceGET: GETService,
    private postService: POSTService,
    @Inject(MAT_DIALOG_DATA) public data: ClearSchedaDialogData) { }
    
    forzatura_chiusura!: string;
    note_forzatura!: string;

  ngOnInit() {

    if (!this.dialogRef.componentInstance.data.showCloseMotivation)
    {
      this.postAttribute("forzatura_chiusura", "");
      this.postAttribute("note_forzatura", "");
      this.postAttribute("stato_chiusura", "");
    }

    this.serviceGET.getWorkingData().subscribe(d => {
      console.log(JSON.stringify(d));

      this.forzatura_chiusura = JcrHelper.getJcrStringValue(d, "forzatura_chiusura");
      this.note_forzatura = JcrHelper.getJcrStringValue(d, "note_forzatura");
    }, error => {
      console.error(error);
    });
  }

  onChangeRf($event : any) {
    console.log("Evento:" + $event);
    let fieldName: string = $event.source.name;
    let fieldvalue: string = $event.source.value;
    this.postAttribute(fieldName, fieldvalue);
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }
}
