import { ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GETService } from 'src/app/get.service';
import { POSTService } from 'src/app/post.service';
import { Utils } from 'src/app/_helpers/utils';
import { User } from 'src/app/_models';
import { SchedaSlingAttributeBean } from 'src/app/_models/SchedaSlingAttributeBean';
import { Smartlist } from 'src/app/_models/smartlist';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-single-select-control',
  templateUrl: './single-select-control.component.html',
  styleUrls: ['./single-select-control.component.css']
})
export class SingleSelectControlComponent implements OnInit {

  //@Input() isRequired: boolean = false;
  //@Input() isRequired: boolean = false;

  @Input()
  label!: string;
  @Input("selectedItem")
  selectedTextValue!: string;
  @Input()
  smartlistName!: string;

  @Output() saveData = new EventEmitter<string>();
  @Output() valueChanged = new EventEmitter<string>();

  labelTemplate!: string;
  mapDropdownListFields: Map<string, any> = new Map<string, any>();
  mapRadioButtonFields: Map<string, any> = new Map<string, any>();
  options: Map<string, any> = new Map<string, any>();
  selectedDdlValue!: string;
  selectedRadioValue!: string;
  smartlist!: Smartlist;
  values: string = "values";

  currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private getService: GETService,
    private postService: POSTService,
    private changeDetector: ChangeDetectorRef/*,
    private currentUser: User*/) {
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUser();
    this.smartlist = new Smartlist(this.getService, this.smartlistName);
    this.smartlist.init();

    if (!(this.label === null || this.label === undefined)) {
      this.labelTemplate = this.label.substring(0, 1).toUpperCase() + this.label.substring(1);
    }
    console.log(this.selectedRadioValue);
  }

  canEdit(): boolean {
    if (!this.currentUser.Groups) {
      return false;
    }
    if (!this.smartlist.Editors) {
      return true;
    }
    var result = (this.smartlist.Editors.length < 1) ||
      this.smartlist.Editors.filter(value => this.currentUser.Groups.includes(value)).length > 0;
    return result;
  }

  isDisabled(): boolean {
    if (!this.currentUser.Groups) {
      return true;
    }
    if (!this.smartlist.Editors) {
      return false;
    }
    var result = (this.smartlist.Editors.length < 1) ||
      this.smartlist.Editors.filter(value => this.currentUser.Groups.includes(value)).length > 0;
    return !result;
  }

  detectChanges(): void {
    this.changeDetector.detectChanges();
  }

  getKeys(map: Map<string, any>) : string[] {
    return Utils.getKeys(map);
  }

  getLabel() {
    return this.label;
  }

  setName(name: string) {
    this.labelTemplate = name;
  }

  setOption(itemView: string, itemValue: any) {
    // this.options.push(new OptionRadiobutton(itemValue, itemView))
    this.options.set(itemView, itemValue);
  }

  OnChangeDdlField($event : any) {
    console.log($event);
    let sl: Map<string, any> = this.smartlist.getDdlFields().get(`${this.smartlistName}_ddl`) as Map<string, any>;
    sl.set("selected_value", $event.value);
    let fieldName: string = sl.get("PropertyName");
    let fieldvalue: string = sl.get("selected_value");
    this.saveData.emit(fieldName + ":" + fieldvalue);
    this.selectedTextValue = fieldvalue;
    this.selectedRadioValue = "";
    this.postAttribute(fieldName, fieldvalue);
    this.valueChanged.emit(fieldvalue);
  }

  OnChangeRadioField($event : any) {
    console.log($event);
    this.smartlist.getRadioFields().get($event.source.name)?.set("selected_value", $event.value)
    let fieldName: string = this.smartlist.getRadioFields().get($event.source.name)?.get("PropertyName");
    let fieldvalue: string = this.smartlist.getRadioFields().get($event.source.name)?.get("selected_value");
    this.saveData.emit(fieldName + ":" + fieldvalue);
    this.selectedTextValue = fieldvalue;
    this.selectedDdlValue = "";
    this.postAttribute(fieldName, fieldvalue);
    this.valueChanged.emit(fieldvalue);
  }

  textFocusOut() {
    this.saveData.emit("textfield:" + this.selectedTextValue)
    console.log("this.selectedTextValue: " + this.selectedTextValue);
    this.selectedRadioValue = "";
    this.selectedDdlValue = "";
    this.postAttribute(this.smartlistName, this.selectedTextValue);
    this.valueChanged.emit(this.selectedTextValue);
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
