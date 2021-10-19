import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GETService } from '../get.service';
import { POSTService } from '../post.service';
import { EffettiPersonaliChkModel } from '../_models/EffettiPersonaliChkModel';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';
import { Smartlist } from '../_models/smartlist';

@Component({
  selector: 'app-effetti-personali',
  templateUrl: './effetti-personali.component.html',
  styleUrls: ['./effetti-personali.component.css']
})
export class EffettiPersonaliComponent implements OnInit {
  // @Input() template:EffettiPersonaliTemplate;
  tmp: boolean = false;
  // inputvalue: string;
  // inputvalue: string;
  @Input()
  label!: string;
  @Input()
  smartlistName!: string;
  @Input()
  selectedItems!: string[];
  @Input()
  protesi_acustica!: boolean;
  @Input()
  protesi_dentaria!: boolean;
  @Input()
  occhiali!: boolean;
  @Input()
  effetti_personali_text!: string;
  @Input()
  selectedRadioValue!: string;

  checkedItems: FormGroup;

  labelTemplate!: string;
  selectedDdlValue!: string;
  selectedTextValue!: string;
  selectedCheckBoxValue!: string;
  fieldDescription: string = "PropertyDescription";
  fieldName: string = "PropertyName";
  values: string = "values";
  smartlist!: Smartlist;

  effettiPersonaliChkModel: EffettiPersonaliChkModel;
  effettiPersonaliLoaded: boolean;

  constructor(
    private getService: GETService,
    private postService: POSTService,
    private fb: FormBuilder) {
    // https://material.angular.io/components/checkbox/examples
    this.effettiPersonaliChkModel = new EffettiPersonaliChkModel();
    this.effettiPersonaliLoaded = false;
    this.checkedItems = this.fb.group({
      protesi_dentaria: false,
      protesi_acustica: false,
      occhiali: false
    });
  }

  ngOnInit(): void {
    this.smartlist = new Smartlist(this.getService, this.smartlistName);
    this.labelTemplate = this.label.substring(0, 1).toUpperCase() + this.label.substring(1);

    let x = Array.from(this.smartlist.loadCheckBoxFields("effetti_personali"));
    console.log(JSON.stringify(x));
    console.log(this.smartlist.getCheckBoxFields().size);



    // this.checkedItems = this.fb.group(
    //   this.getKeys(this.smartlist.getCheckBoxFields()))
  }

  ngAfterViewInit() {
    let x = Array.from(this.smartlist.loadCheckBoxFields("effetti_personali"));
    console.log(JSON.stringify(x));
    console.log("******************************** EffettiPersonaliComponent ngAfterViewInit");
    this.buildCheckBoxesForm();
  }

  ngAfterViewChecked() {
    this.buildCheckBoxesForm();
  }

  buildCheckBoxesForm() {
    let x = Array.from(this.smartlist.loadCheckBoxFields("effetti_personali"));
    if (this.selectedItems === null || this.selectedItems === undefined) {
      return;
    }
    if (x.length < 1) {
      return;
    }
    if (this.effettiPersonaliLoaded) {
      return;
    }
    this.effettiPersonaliLoaded = true;
    x.forEach(kv => {
      let fieldName: string = kv[0];
      let isSelected: boolean = this.checkContainment(this.selectedItems, fieldName);
      console.log(`${this.selectedItems} contains ${fieldName} ? ${isSelected}`);
      if ("protesi_dentaria" === fieldName) {
        this.effettiPersonaliChkModel.protesi_dentaria = isSelected;
      } else if ("protesi_acustica" === fieldName) {
        this.effettiPersonaliChkModel.protesi_acustica = isSelected;
      } else if ("occhiali" === fieldName) {
        this.effettiPersonaliChkModel.occhiali = isSelected;
      }
    });
    console.log(`********* ngAfterViewChecked mapCheckboxes: ${JSON.stringify(this.effettiPersonaliChkModel)}`);

    let checkboxFormModel: { [k: string]: any } = {};
    checkboxFormModel.protesi_dentaria = this.effettiPersonaliChkModel.protesi_dentaria;
    checkboxFormModel.protesi_acustica = this.effettiPersonaliChkModel.protesi_acustica;
    checkboxFormModel.occhiali = this.effettiPersonaliChkModel.occhiali;

    this.checkedItems = this.fb.group(checkboxFormModel);
    // let y = new Map(x.map(key => [key, false] as [string, boolean]));

    console.log(JSON.stringify(this.checkedItems.value));
  }


  checkContainment(selectedItems: string[], value: string): boolean {
    return selectedItems.includes(value);
  }

  postContent() {
  }

  getKeys(map: Map<string, any>): Array<string> {
    // return Array.from(this.options.keys());
    return Array.from(map.keys());
  }

  putChkCHange() {
    console.log(JSON.stringify(this.checkedItems.value));
    let values: string[] = [];
    if (this.checkedItems.value.occhiali) {
      values.push("occhiali");
    }
    if (this.checkedItems.value.protesi_acustica) {
      values.push("protesi_acustica");
    }
    if (this.checkedItems.value.protesi_dentaria) {
      values.push("protesi_dentaria");
    }

    this.postAttributeMulti("effetti_personali", values);
    console.log("************ putChkCHange");
  }

  postAttributeMulti(fieldId: string, fieldValues: string[]) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, JSON.stringify(fieldValues), "String", true, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  isSelectedItem(item: string): boolean {
    let result: boolean = this.selectedItems.includes(item);
    console.log(`isSelectedItem: '${item}'? ${result}`)
    return result;
  }

  OnChangeRadioField($event : any) {
    console.log($event);
    let x = $event.source.value;
    this.postAttribute("effetti_personali_consegnati_a", x);
  }

}
