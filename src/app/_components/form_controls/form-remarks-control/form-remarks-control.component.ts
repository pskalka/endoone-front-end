import { Component, Input, OnInit } from '@angular/core';
import { GETService } from 'src/app/get.service';
import { POSTService } from 'src/app/post.service';
import { Utils } from 'src/app/_helpers/utils';
import { User } from 'src/app/_models';
import { SchedaSlingAttributeBean } from 'src/app/_models/SchedaSlingAttributeBean';
import { Smartlist } from 'src/app/_models/smartlist';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-form-remarks-control',
  templateUrl: './form-remarks-control.component.html',
  styleUrls: ['./form-remarks-control.component.css']
})
export class FormRemarksControlComponent implements OnInit {
  @Input()
  fieldName!: string;
  @Input()
  hint!: string;
  @Input()
  label!: string;
  @Input()
  smartlistName!: string;
  @Input()
  value!: string;

  private currentUser!: User;
  smartlist!: Smartlist;

  public presetRemarks!: string[];

  constructor(
    private authenticationService: AuthenticationService,
    private getService: GETService,
    private postService: POSTService
  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.getUser();
    this.smartlist = new Smartlist(this.getService, this.smartlistName);
    this.smartlist.onLoadComplete = () => {
      this.presetRemarks = Utils.getKeys(this.smartlist.formDdlFields.get(`${this.smartlistName}_ddl`)?.get("values"));
    };
    this.smartlist.init();
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

  getKeys(map: Map<string, any>): string[] {
    return Utils.getKeys(map);
  }

  inputFocusOut(): void {
    console.log(`FormRemarksControlComponent "${this.fieldName}" inputFocusOut(): "${this.value}"`);
    this.postAttribute(this.smartlistName, this.value);
  }

  maxLength() : number {
    return this.smartlist.MaxLength;
  }

  OnChangeDdlField($event : any) {
    console.log(`FormRemarksControlComponent "${this.fieldName}" OnChangeDdlField(): "${$event}"`);
    this.value = (this.value == null) ?
      `${$event.value}\n` :
      this.value.concat(`${$event.value}\n`);
    this.inputFocusOut();
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
