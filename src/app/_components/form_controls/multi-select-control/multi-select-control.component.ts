import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GETService } from 'src/app/get.service';
import { POSTService } from 'src/app/post.service';
import { JcrHelper } from 'src/app/_helpers/jcrhelper';
import { Utils } from 'src/app/_helpers/utils';
import { CheckBoxModel } from 'src/app/_models/checkbox.model';
import { SchedaSlingAttributeBean } from 'src/app/_models/SchedaSlingAttributeBean';
import { Smartlist } from 'src/app/_models/smartlist';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-multi-select-control',
  templateUrl: './multi-select-control.component.html',
  styleUrls: ['./multi-select-control.component.css']
})
export class MultiSelectControlComponent implements OnInit {

  @Input()
  smartlistName!: string;

  addedItems: string[] = [];
  checkedItems!: string[];
  chkItems!: string[];
  ddlItems!: string[];
  formGroup!: FormGroup;
  formGroupModel: { [k: string]: any } = {};
  myCheckBoxes: CheckBoxModel[] = [];
  selectedDdlItem: string = "";
  smartlist!: Smartlist;
  txtManualModel: string = "";
  values: string = "values";

  constructor(
    private authenticationService: AuthenticationService,
    private getService: GETService,
    private postService: POSTService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef
  ) {
  }

  currentUser!: User;

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

  ngOnInit() {
    this.currentUser = this.authenticationService.getUser();
    this.smartlist = new Smartlist(this.getService, this.smartlistName);
    this.smartlist.onLoadComplete = () => {
      this.getService.getWorkingData().subscribe(d => {
        console.log(JSON.stringify(d));
        this.ddlItems = Utils.getKeys((this.smartlist.formDdlFields.get(`${this.smartlistName}_ddl`)?.get("values")));
        this.chkItems = (this.smartlist.formCheckBoxFields.get(`${this.smartlistName}_chk`)?.get("values")) as string[];
        this.checkedItems = JcrHelper.getJcrStringArrayValue(d, this.smartlistName);
        this.buildMyCheckBoxes();
      });
    };
    this.smartlist.init();
    this.formGroup = this.fb.group(this.formGroupModel);
  }

  buildMyCheckBoxes(): void {
    let keys: string[] = [];
    let result: CheckBoxModel[] = [];
    this.formGroupModel = {};
    if (!(this.addedItems === null || this.addedItems === undefined)) {
      this.addedItems.forEach(element => {
        if (element != '' && !keys.includes(element)) {
          console.log(`adding from this.addedItems, new CheckBoxModel: ${element}`);
          keys.push(element);
          result.push(new CheckBoxModel("manual", element, `chk_${element}`, element, true));
        }
      });
    }
    if (!(this.checkedItems === null || this.checkedItems === undefined)) {
      this.checkedItems.forEach(element => {
        if (element != '' && !keys.includes(element)) {
          console.log(`adding from this.checkedItems, new CheckBoxModel: ${element}`);
          keys.push(element);
          result.push(new CheckBoxModel("manual", element, `chk_${element}`, element, true));
        }
      });
    }
    if (!(this.chkItems === null || this.chkItems === undefined)) {
      this.chkItems.forEach(element => {
        if (element != '' && !keys.includes(element)) {
          console.log(`adding from this.smartlist.formCheckBoxFields, new CheckBoxModel: ${element}`);
          keys.push(element);
          result.push(new CheckBoxModel("smartlist", element, `chk_${element}`, element, false));
        }
      });
    }
    result.forEach(element => {
      this.formGroupModel[element.controlName] = element.isChecked;
    });
    this.formGroup = this.fb.group(this.formGroupModel);
    console.log("MultiSelectControlComponent.buildMyCheckBoxes result:");
    console.log(JSON.stringify(result));
    this.myCheckBoxes = result;
  }

  onBtnAddClick() {
    let newItem: string = "";
    console.log(this.txtManualModel);
    if (typeof this.txtManualModel != 'undefined' && this.txtManualModel) {
      newItem = this.txtManualModel;
    } else if (typeof this.selectedDdlItem != 'undefined' && this.selectedDdlItem) {
      newItem = this.selectedDdlItem;
    } else {
      newItem = "";
    }
    this.txtManualModel = "";
    this.selectedDdlItem = "";
    if (typeof newItem != 'undefined' && newItem) {
      if (!this.addedItems.includes(newItem)) {
        this.addedItems.push(newItem);
      }
      this.buildMyCheckBoxes();
      this.putChkCHange();
    }
  }

  putChkCHange() {
    console.log(JSON.stringify(this.formGroup.value));
    let myFields: string[] = Object.getOwnPropertyNames(this.formGroup.value);
    let checkedItems: string[] = [];
    myFields.forEach(e => {
      if (this.formGroup.value[e] === true) {
        checkedItems.push(e.substring(4));
      }
    });

    console.log(JSON.stringify(checkedItems));

    this.postAttributeMulti(this.smartlistName, checkedItems);
    this.checkedItems = checkedItems;

    // regenerate added items
    var tmpAddedItems: string[] = [];
    checkedItems.forEach(checkedItem => {
      if (this.addedItems.includes(checkedItem)) {
        tmpAddedItems.push(checkedItem);
      }
    });
    this.addedItems = tmpAddedItems;
  }

  postAttributeMulti(fieldId: string, fieldValues: string[]) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, JSON.stringify(fieldValues), "String", true, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

}
