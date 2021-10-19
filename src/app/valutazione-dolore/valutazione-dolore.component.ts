import { Component, OnInit, Input } from '@angular/core';
import { ValutazioneDoloreTemplate } from '../_models/ValutazioneDoloreTemplate';

@Component({
  selector: 'app-valutazione-dolore',
  templateUrl: './valutazione-dolore.component.html',
  styleUrls: ['./valutazione-dolore.component.css']
})
export class ValutazioneDoloreComponent implements OnInit {
  @Input()
  template!: ValutazioneDoloreTemplate;
  inputvalue!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
