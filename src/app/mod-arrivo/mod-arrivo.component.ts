import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { POSTService } from '../post.service';
import { GETService } from '../get.service';
import { Smartlist } from '../_models/smartlist';
import { FormControl } from '@angular/forms';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-mod-arrivo',
  templateUrl: './mod-arrivo.component.html',
  styleUrls: ['./mod-arrivo.component.css']
})
export class ModArrivoComponent implements OnInit {
  @Input() isRequired: boolean = false;


  // @Input() template:FormSingleSelectTemplate;
  // @Input() template:FormSingleSelectTemplate;


  @Input()
  label!: string;
  @Input()
  smartlistName!: string;
  @Input()
  selectedItem!: string;

  @Output() saveData = new EventEmitter<string>();
  labelTemplate!: string;
  selectedRadioValue!: string;
  selectedDdlValue!: string;
  selectedTextValue!: string;
  selectedCheckBoxValue!: string;
  @Input()
  presenza_accompagnatore!: boolean;
  values: string = "values";

  servicePOST!: POSTService;
  body!: FormData;
  inputvalue!: string;
  id!: number;

  smartlist!: Smartlist;
  commentFC = new FormControl();
  // textFields: Map<string, FormControl>

  @Output() valueChanged = new EventEmitter<string>();

  constructor(
    private getService: GETService,
    private postService: POSTService) { }

  ngOnInit() {
    this.smartlist = new Smartlist(this.getService, this.smartlistName);
    this.smartlist.init();
    this.labelTemplate = this.label.substring(0,1).toUpperCase() + this.label.substring(1);
  }

  getKeys(map: Map<string, any>): Array<string> {
    // return Array.from(this.options.keys());
    return Array.from(map.keys());
  }

  onchange(){
    // this.body.append(this.template.label, this.inputvalue);
    // this.servicePOST.postContent(this.body);
    // this.servicePOST.postContent(this.body, this.id);
  }

  onSubmit(){
    console.log("this.selectedRadioValue: " + this.selectedRadioValue);
    console.log("this.selectedDdlValue: " + this.selectedDdlValue);
    console.log("this.selectedTextValue: " + this.selectedTextValue);
  }

  OnChangeDdlField($event : any){
    console.log($event);
    this.smartlist.getDdlFields().get($event.source.id)?.set("selected_value", $event.value )
    let fieldName: string = this.smartlist.getDdlFields().get($event.source.id)?.get("PropertyName");
    let fieldvalue: string = this.smartlist.getDdlFields().get($event.source.id)?.get("selected_value");
    // let fieldDataSave: Map<string, string> = new Map<string,string>();
    // fieldDataSave.set(fieldName, fieldvalue);
    // this.saveData.emit(fieldDataSave);
    this.saveData.emit(fieldName + ":" + fieldvalue);
    this.selectedTextValue = fieldvalue;
    this.selectedRadioValue = "";
    this.postAttribute(fieldName, fieldvalue);
    this.valueChanged.emit(fieldvalue);
  }

  OnChangeRadioField($event : any){
    console.log($event);
    this.smartlist.getRadioFields().get($event.source.name)?.set("selected_value", $event.value ) 
    let fieldName: string = this.smartlist.getRadioFields().get($event.source.name)?.get("PropertyName");
    let fieldvalue: string = this.smartlist.getRadioFields().get($event.source.name)?.get("selected_value");
    this.saveData.emit(fieldName + ":" + fieldvalue);
    this.selectedTextValue = fieldvalue;
    this.selectedDdlValue = "";
    this.postAttribute(fieldName, fieldvalue);
    this.valueChanged.emit(fieldvalue);
  }

  textChangeValue(){
    // textChangeValue(fieldName: string){
    // let fieldName: string = this.smartlist.getRadioFields().get($event.source.name).get("PropertyName");
    // console.log($event);
    this.saveData.emit("textfield:" + this.selectedItem)
    console.log("this.selectedTextValue: " + this.selectedItem);
    this.selectedRadioValue = "";
    this.selectedDdlValue = "";
    this.postAttribute("modalita_arrivo", this.selectedItem);
    // console.log("this.commentFC.name: " + this.commentFC.value);
    // this.saveData.emit(fieldName + ":" + this.selectedTextValue);
    this.valueChanged.emit(this.selectedItem);
  }
 
  putPresenzaAccompagnatore() {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean("presenza_accompagnatore", this.presenza_accompagnatore, "Boolean", false, false, false))
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

}

