import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-motivo-esame-urgenza',
  templateUrl: './motivo-esame-urgenza.component.html',
  styleUrls: ['./motivo-esame-urgenza.component.css']
})
export class MotivoEsameUrgenzaComponent implements OnInit {
  @Input()
  esame_motivo!: string;
  @Input()
  urgenza!: boolean;

  constructor() { }

  ngOnInit() {
  }

}
