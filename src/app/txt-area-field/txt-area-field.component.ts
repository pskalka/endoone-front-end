import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-txt-area-field',
  templateUrl: './txt-area-field.component.html',
  styleUrls: ['./txt-area-field.component.css']
})
export class TxtAreaFieldComponent implements OnInit {
  @Input("placeholder")
  myPlaceholder!: string;
  @Input("value")
  myValue!: string;
  @Input("fieldName")
  myFieldName!: string;

  @Output() change = new EventEmitter<string>();

  constructor(private postService: POSTService) { }

  ngOnInit() {
  }

  inputFocusOut() {
    console.log(this.myValue);
    this.change.emit(this.myValue);
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(this.myFieldName, this.myValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

}
