import { Component, Input, OnInit } from '@angular/core';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-txt-field',
  templateUrl: './txt-field.component.html',
  styleUrls: ['./txt-field.component.css']
})
export class TxtFieldComponent implements OnInit {
  @Input("placeholder")
  myPlaceholder!: string;
  @Input("value")
  myValue!: string;
  @Input("fieldName")
  myFieldName!: string;

  constructor(private postService: POSTService) { }

  ngOnInit() {
  }

  inputFocusOut() {
    console.log(this.myValue);
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(this.myFieldName, this.myValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

}
