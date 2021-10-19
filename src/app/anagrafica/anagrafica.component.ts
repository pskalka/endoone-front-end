import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AnagraficaTemplate } from '../_models/AnagraficaTemplate';
import { ProtocolService } from '../protocol.service';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css']
})
export class AnagraficaComponent implements OnInit, OnChanges {
  @Input() isCognomeRequired: boolean;
  @Input() isNomeRequired: boolean;
  @Input() isDataDiNascitaRequired: boolean;

  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  // @Input() template:AnagraficaTemplate;
  @Input() label: string;
  @Input() cognome: string;
  @Input() nome: string;
  @Input() data_di_nascita: string;
  @Input() numeroProtocollo: string;

  @Output() cognomeChanged = new EventEmitter<string>();
  @Output() nomeChanged = new EventEmitter<string>();
  @Output() data_di_nascitaChanged = new EventEmitter<string>();

  constructor(
    private protocolService: ProtocolService,
    private postService: POSTService) {

  }

  ngOnChanges() {
  }

  ngOnInit() {
    // this.getCurrentProtocolNumber();
  }

  // getCurrentProtocolNumber(){
  //   this.numeroProtocollo = this.protocolService.getProtocolNumber();
  //   return this.numeroProtocollo;
  // }

  dataNascitaFocusOut() {
    console.log(this.data_di_nascita);
  }

  inputFocusOut($event) {
    console.log(`${$event.srcElement.name}: '${$event.srcElement.value}'`);
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean($event.srcElement.name, $event.srcElement.value, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }  

}

