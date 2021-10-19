import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-field-mark',
  templateUrl: './required-field-mark.component.html',
  styleUrls: ['./required-field-mark.component.css']
})
export class RequiredFieldMarkComponent implements OnInit {
  @Input() isVisible: boolean;

  constructor() { }

  ngOnInit() {
  }

}
