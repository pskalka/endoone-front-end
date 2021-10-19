import { OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { GETService } from "../get.service";
import { FieldType } from "./field-type.enum";

/**
 * Always remember to call the Smartlist.init method in the ngOnInit component method
 */
export class Smartlist {

  public IsRequired: boolean;
  public MaxLength!: number;
  public Editors!: string[];

  public onLoadComplete?: () => void

  smartlists: Map<string, any>;
  smartilistJcrfieldProperties: Map<string, string>;
  formRadioFields = new Map<string, Map<string, any>>();
  formDdlFields = new Map<string, Map<string, any>>();
  formCheckBoxFields = new Map<string, Map<string, any>>();
  formTextFields = new Map<string, Map<string, any>>();

  constructor(private getService: GETService, private smartlistName: string) {
    this.IsRequired = false;
    this.smartlists = new Map<string, any>();
    this.smartilistJcrfieldProperties = new Map<string, string>();
    environment.smartilistJcrfieldProperties.forEach(element => {
      this.smartilistJcrfieldProperties.set(element, element);
    });
  }
  
  init(): void {
    console.log(`Smartlist.ngOnInit smartlistName=${this.smartlistName}`);
    this.loadSmartlists(this.smartlistName);
  }

  public getRadioFields() {
    return this.formRadioFields;
  }

  public getDdlFields() {
    return this.formDdlFields;
  }

  public getCheckBoxFields() {
    return this.formCheckBoxFields;
  }

  public getTextFields() {
    return this.formTextFields;
  }
  public loadSmartlists(smartlistName: string) {
    // this.getService.getSmartlist(smartlistName).toPromise()
    // .then(result => {
    //   console.log('From Promise:', result);
    // });
    // console.log("topromise: ", topromise);

    this.getService.getSmartlist(smartlistName).subscribe(ele => {
      // let responseBody: any = []; 
      // smartlist.push(ele.responseBody);
      // smartlist = ele.responseBody;
      this.smartlists.set(smartlistName, JSON.parse(JSON.stringify(ele.responseBody)));
      console.log(`smartlist '${smartlistName}' get call subscribe called`);
    },
      error => console.log("Error: ", error),
      () => {
        let smartlist = this.smartlists.get(smartlistName);
        console.log("smartlist: ", smartlist)

        // get the smartlist named as the property itself
        let mainSmartlist: any = smartlist[smartlistName];
        // look for a boolean property named PropertyRequired on that smartlist
        this.IsRequired =
          Boolean(mainSmartlist["PropertyRequired"]) &&
          Boolean(JSON.parse(mainSmartlist["PropertyRequired"]));

        this.MaxLength =
          (mainSmartlist["PropertyMaxLength"]) ? +mainSmartlist["PropertyMaxLength"] : environment.defaultMaxLength;
        this.Editors =
          (mainSmartlist["PropertyEditors"]) ? mainSmartlist["PropertyEditors"] : Array<string>(0);

        this.loadRadioFields(smartlistName);
        this.loadDdlFields(smartlistName);
        this.loadCheckBoxFields(smartlistName);
        this.loadTextFields(smartlistName);
        
        console.log(`smartlist '${smartlistName}' get call complete called`);
        if (!this.onLoadComplete) {
          return;
        } else {
          this.onLoadComplete();
        }
      });
  }

  public loadRadioFields(smartlistName: string) {
    console.log(`Smartlist.loadRadioFields ${smartlistName}`);
    // let formRadioFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    console.log("smartlist: ", smartlist)

    for (var fieldName in smartlist) {
      let field: any = smartlist[fieldName];
      if (field["PropertyType"] == FieldType.radio_button) {
        let fieldProperties: Map<string, any> = new Map<string, any>();
        //console.debug("fieldName:" + fieldName + " - field[\"PropertyType\"]: " + field["PropertyType"]);
        for (let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()) {
          //console.debug("jcrFieldPropertyName:" + jcrFieldPropertyName);
          if (jcrFieldPropertyName.toLowerCase() != "value") { //|| jcrFieldPropertyName.toLowerCase() != "PropertyType"){
            //console.debug("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
            fieldProperties.set(jcrFieldPropertyName, field[jcrFieldPropertyName]);
          }
        }
        let values: Map<string, any> = new Map<string, any>();
        for (var element in field.value) {
          values.set(field.value[element], field.value[element]);
        };
        fieldProperties.set("values", values);
        console.log(Array.from(values.keys()).join(", "));
        // this.formRadioFields.set(fieldName, fieldProperties);
        this.formRadioFields.set(fieldName, fieldProperties);
      }
    }
    return this.formRadioFields;
  }


  public loadDdlFields(smartlistName: string) {
    console.log(`Smartlist.loadDdlFields ${smartlistName}`);
    // let formDdlFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    // console.log("smatlist: ", smartlist)

    for (var fieldName in smartlist) {
      let field: any = smartlist[fieldName];
      if (field["PropertyType"] == FieldType.dropdownlist) {
        // console.debug("fieldName:" + fieldName + " - field[\"PropertyType\"]: " + field["PropertyType"]);
        let fieldProperties: Map<string, any> = new Map<string, any>();
        for (let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()) {
          // console.debug("jcrFieldPropertyName:" + jcrFieldPropertyName);
          if (jcrFieldPropertyName.toLowerCase() != "value") { //|| jcrFieldPropertyName.toLowerCase() != "PropertyType"){

            // console.debug("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
            fieldProperties.set(jcrFieldPropertyName, field[jcrFieldPropertyName]);

          }
        }
        let values: Map<string, any> = new Map<string, any>();
        for (var element in field.value) {
          values.set(field.value[element], field.value[element]);
        };
        fieldProperties.set("values", values);
        console.log(Array.from(values.keys()).join(", "));
        this.formDdlFields.set(fieldName, fieldProperties);
      }
    }
    return this.formDdlFields;
  }

  public loadCheckBoxFields(smartlistName: string) {
    console.log(`Smartlist.loadCheckBoxFields ${smartlistName}`);
    // let formCheckBoxFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    // console.log("smatlist: ", smartlist)
    for (var fieldName in smartlist) {
      let field: any = smartlist[fieldName];
      if (field["PropertyType"] == FieldType.checkbox) {
        //console.debug("fieldName:" + fieldName + " - field[\"PropertyType\"]: " + field["PropertyType"]);

        let fieldProperties: Map<string, any> = new Map<string, any>();
        // for(var fieldPropertiesName in field){
        for (let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()) {
          // if( environment.smartilistJcrfieldProperties.includes(fieldPropertiesName) && fieldPropertiesName.toLowerCase() != "value" && ){
          //console.debug("jcrFieldPropertyName:" + jcrFieldPropertyName);
          // if( jcrFieldPropertyName.toLowerCase() != "value" || jcrFieldPropertyName.toLowerCase() != "PropertyType"){
          //console.debug("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
          // fieldProperties.set(fieldPropertiesName,smartlist[fieldName][fieldPropertiesName]);
          fieldProperties.set(jcrFieldPropertyName, field[jcrFieldPropertyName]);
          // } 
        }
        // fieldProperties.set("value",field.value);
        fieldProperties.set("values", field.value);
        this.formCheckBoxFields.set(fieldName, fieldProperties);
      }
    }
    return this.formCheckBoxFields;
  }

  public loadTextFields(smartlistName: string) {
    console.log(`Smartlist.loadTextFields ${smartlistName}`);
    // let formTextFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    // console.log("smatlist: ", smartlist)

    for (var fieldName in smartlist) {
      let field: any = smartlist[fieldName];
      if (field["PropertyType"] == FieldType.text) {
        //console.debug("fieldName:" + fieldName + " - field[\"PropertyType\"]: " + field["PropertyType"]);
        let fieldProperties: Map<string, any> = new Map<string, any>();
        // for(var fieldPropertiesName in field){
        for (let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()) {
          // if( environment.smartilistJcrfieldProperties.includes(fieldPropertiesName) && fieldPropertiesName.toLowerCase() != "value" && ){
          //console.debug("jcrFieldPropertyName:" + jcrFieldPropertyName);
          if (jcrFieldPropertyName.toLowerCase() != "value" || jcrFieldPropertyName.toLowerCase() != "PropertyType") {

            //console.debug("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
            // fieldProperties.set(fieldPropertiesName,smartlist[fieldName][fieldPropertiesName]);
            fieldProperties.set(jcrFieldPropertyName, field[jcrFieldPropertyName]);

          }
        }
        // fieldProperties.set("value",field.value);
        this.formTextFields.set(fieldName, fieldProperties);
      }
    }
    return this.formTextFields;
  }
}

