import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GETService } from '../get.service';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-selezione-sala',
  templateUrl: './selezione-sala.component.html',
  styleUrls: ['./selezione-sala.component.css']
})
export class SelezioneSalaComponent implements OnInit {
  values: string[] = ["Sala A", "Sala B", "Sala C", "Sala D", "Sala E", "Sala F", "Sala G", "Sala H", "Sala I"];

  @Input()
  selezione_sala_value!: string;
  @Input()
  fieldName!: string;

  @Output() valueChanged = new EventEmitter<string>();

  constructor(private postService: POSTService, private getService: GETService) { }

  ngOnInit() {

    let salaList = this.getService.getSalaList().subscribe(
      res  => {
        console.log(Object.keys(res));
        this.values = Object.keys(res);
        this.values.shift();
        
      }, 
      (error) => {
        console.log("Sale non configurate.");
      },
      () => {
          console.log();
      }
    )

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
    this.postAttribute(this.fieldName, this.selezione_sala_value);
    this.valueChanged.emit(this.selezione_sala_value);
  }

}
