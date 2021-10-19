import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-valutazione-dolore-nrs',
  templateUrl: './valutazione-dolore-nrs.component.html',
  styleUrls: ['./valutazione-dolore-nrs.component.css']
})
export class ValutazioneDoloreNrsComponent implements OnInit {
  values: string[] = ["0 assente", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 forte"];

  @Input()
  valutazione_dolore_nrs_value!: string;
  @Input()
  valutazione_dolore_nrs_intervento!: string;
  @Input()
  fieldName!: string;
  @Input()
  interventoFieldName!: string;

  @Output() valueChanged = new EventEmitter<string>();
  @Output() interventoChanged = new EventEmitter<string>();

  constructor(private postService: POSTService) { }

  ngOnInit() {
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  selectionChange($event : any): void {
    this.postAttribute(this.fieldName, this.valutazione_dolore_nrs_value);
    this.valueChanged.emit(this.valutazione_dolore_nrs_value);
  }

  intervento_change($event: any): void {
    this.interventoChanged.emit($event);
  }
}
