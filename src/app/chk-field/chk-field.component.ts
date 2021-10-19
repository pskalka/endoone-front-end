import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-chk-field',
  templateUrl: './chk-field.component.html',
  styleUrls: ['./chk-field.component.css']
})
export class ChkFieldComponent implements OnInit {
  @Input() value: boolean;
  @Output() valueChange = new EventEmitter<boolean>();
  @Input() fieldName: string;
  @Input("label") myLabel: string;

  constructor(private postService: POSTService) {
  }

  ngOnInit() {
  }

  putValue() {
    console.log(`${this.fieldName}=${this.value}`);
    this.valueChange.emit(this.value);
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(this.fieldName, this.value, "Boolean", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

}
