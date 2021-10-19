import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dati-informativi-base',
  templateUrl: './dati-informativi-base.component.html',
  styleUrls: ['./dati-informativi-base.component.css']
})
export class DatiInformativiBaseComponent implements OnInit {
  @Input() title: string;
  /*@Input()*/ allattamento: boolean;
  /*@Input()*/ //digiuno: boolean;
  /*@Input()*/ gravidanza: boolean;
  /*@Input()*/ lingua_italiana: boolean;
  /*@Input()*/ dati_informativi_base_note: string;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(`title='${this.title}'`);
    console.log(`allattamento='${this.allattamento}'`);
    //console.log(`digiuno='${this.digiuno}'`);
    console.log(`gravidanza='${this.gravidanza}'`);
    console.log(`lingua_italiana='${this.lingua_italiana}'`);
    console.log(`dati_informativi_base_note='${this.dati_informativi_base_note}'`);
  }

  detectChanges(): void {
    this.changeDetector.detectChanges();
  }

}
