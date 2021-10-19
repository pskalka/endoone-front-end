import { Component, OnInit, Input } from '@angular/core';
import { DatiInformativiTemplate } from '../_models/DatiInformativiTemplate';

@Component({
  selector: 'app-dati-informativi',
  templateUrl: './dati-informativi.component.html',
  styleUrls: ['./dati-informativi.component.css']
})
export class DatiInformativiComponent implements OnInit {
  @Input()
  template!: DatiInformativiTemplate;
  linguaItaliana!: boolean;
  glaucoma!: boolean;
  allergia!: boolean;
  digiuno!: boolean;
  terapiaAnticoaugulante!: boolean;
  gravidanza!: boolean;
  allattamento!: boolean;
  consenso!: boolean;

  linguaItalianaLabel: string = "Lingua Italiana";
  linguaItalianaFieldName: string = "lingua_italiana";

  glaucomaLabel: string = "Glaucoma";
  glaucomaFieldName: string = "glaucoma";

  allergiaLabel: string = "Allergia";
  allergiaFieldName: string = "allergia";

  digiunoLabel: string = "Digiuno";
  digiunoFieldName: string = "digiuno";

  gravidanzaLabel: string = "Gravidanza";
  gravidanzaFieldName: string = "gravidanza";

  allattamentoLabel: string = "Allattamento";
  allattamentoFieldName: string = "allattamento";

  consensoLabel: string = "Consenso";
  consensoFieldName: string = "consenso";

  terapiaAntiCoagulanteLabel: string = "Terapia Anti-Coagulante";
  terapiaAntiCoagulanteFieldName: string = "terapia_anti_coagulante";


  constructor() { }

  ngOnInit() { }

}
