import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GETService } from '../get.service';
import { FieldType } from '../_models/field-type.enum';
import { FormCheckcoxField } from '../_models/form-checkcox-field';
import { FormDropdownlistField } from '../_models/form-dropdownlist-field';
import { FormField } from '../_models/form-field';
import { FormRadioButtonField } from '../_models/form-radio-button-field';
import { FormTextField } from '../_models/form-text-field';

@Injectable({
  providedIn: 'root'
})
export class GetSmartlistFieldsService {

  smartlists: Map<string, any>;
  // formFields: Array<FormField>;
  // formTextFields: Map<string, Map<string, any>>;
  // formDdlFields: Map<string, Map<string, any>>;
  // formCheckboxFields: Map<string, Map<string, any>>;
  // formRadioFields: Map<string, Map<string, any>>;
  smartilistJcrfieldProperties: Map<string, string>;

  constructor(private getService: GETService) { 
    this.smartlists = new Map<string, any>();

    // this.formTextFields = new Map<string, Map<string, any>>();
    // this.formDdlFields = new Map<string, Map<string, any>>();
    // this.formCheckboxFields = new Map<string, Map<string, any>>();
    // this.formRadioFields = new Map<string, Map<string, any>>();
    this.smartilistJcrfieldProperties = new Map<string, string>();
    environment.smartilistJcrfieldProperties.forEach(element => {
      this.smartilistJcrfieldProperties.set(element, element);
    });
    
  }
  loadSmartlists(smartlistName: string){
    // this.getService.getSmartlist(smartlistName).toPromise()
    // .then(result => {
    //   console.log('From Promise:', result);
    // });
    // console.log("topromise: ", topromise);
    
    this.getService.getSmartlist(smartlistName).subscribe(ele=>{
      // let responseBody: any = []; 
      // smartlist.push(ele.responseBody);
      // smartlist = ele.responseBody;
      this.smartlists.set(smartlistName, JSON.parse(JSON.stringify(ele.responseBody)));
    }, 
    error => console.log("Error: ", error),
    () => {});
  }


  loadRadioFields(smartlistName: string){
    console.log(`GetSmartlistFieldsService.loadRadioFields ${smartlistName}`);
    let formRadioFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    console.log("smatlist: ", smartlist)
    
    for (var fieldName in smartlist) {
      console.log("fieldName:" + fieldName);
      let field: any = smartlist[fieldName];
      let fieldProperties: Map<string, any> = new Map<string, any>();
      // for(var fieldPropertiesName in field){
      for(let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()){
        // if( environment.smartilistJcrfieldProperties.includes(fieldPropertiesName) && fieldPropertiesName.toLowerCase() != "value" && ){
        console.log("jcrFieldPropertyName:" + jcrFieldPropertyName);
        if( jcrFieldPropertyName.toLowerCase() != "value" || jcrFieldPropertyName.toLowerCase() != "PropertyType"){
          
          console.log("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
          // fieldProperties.set(fieldPropertiesName,smartlist[fieldName][fieldPropertiesName]);
          fieldProperties.set(jcrFieldPropertyName,field[jcrFieldPropertyName]);
          
        } 
      }
      let values: Map<string, any> = new Map<string, any>();
      if (field["PropertyType"] == FieldType.radio_button ){
        for(var element in field.value){
        // this.setOption(element,  "true" );
          values.set(field.value[element], field.value[element]);    
        };
        fieldProperties.set("values",values);
        // this.formRadioFields.set(fieldName, fieldProperties);
        formRadioFields.set(fieldName, fieldProperties);
      }
    }
    return formRadioFields;
  }

  
  loadDdlFields(smartlistName: string){
    let formDdlFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    // console.log("smatlist: ", smartlist)
    
    for (var fieldName in smartlist) {
      console.log("fieldName:" + fieldName);
      let field: any = smartlist[fieldName];
      let fieldProperties: Map<string, any> = new Map<string, any>();
      // for(var fieldPropertiesName in field){
      for(let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()){
        // if( environment.smartilistJcrfieldProperties.includes(fieldPropertiesName) && fieldPropertiesName.toLowerCase() != "value" && ){
        console.log("jcrFieldPropertyName:" + jcrFieldPropertyName);
        if( jcrFieldPropertyName.toLowerCase() != "value" || jcrFieldPropertyName.toLowerCase() != "PropertyType"){
          
          console.log("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
          // fieldProperties.set(fieldPropertiesName,smartlist[fieldName][fieldPropertiesName]);
          fieldProperties.set(jcrFieldPropertyName,field[jcrFieldPropertyName]);
          
        } 
      }
      let values: Map<string, any> = new Map<string, any>();
      if (field["PropertyType"] == FieldType.dropdownlist ){
        for(var element in field.value){
          values.set(field.value[element], field.value[element]);    
        };
        fieldProperties.set("values",values);
        formDdlFields.set(fieldName, fieldProperties);
      }
    }
    return formDdlFields;
  }

  loadCheckBoxFields(smartlistName: string){
    let formCheckBoxFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    // console.log("smatlist: ", smartlist)
    
    for (var fieldName in smartlist) {
      console.log("fieldName:" + fieldName);
      let field: any = smartlist[fieldName];
      let fieldProperties: Map<string, any> = new Map<string, any>();
      // for(var fieldPropertiesName in field){
      for(let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()){
        // if( environment.smartilistJcrfieldProperties.includes(fieldPropertiesName) && fieldPropertiesName.toLowerCase() != "value" && ){
        console.log("jcrFieldPropertyName:" + jcrFieldPropertyName);
        if( jcrFieldPropertyName.toLowerCase() != "value" || jcrFieldPropertyName.toLowerCase() != "PropertyType"){
          
          console.log("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
          // fieldProperties.set(fieldPropertiesName,smartlist[fieldName][fieldPropertiesName]);
          fieldProperties.set(jcrFieldPropertyName,field[jcrFieldPropertyName]);
          
        } 
      }
      let values: Map<string, any> = new Map<string, any>();
      if (field["PropertyType"] == FieldType.dropdownlist ){
        fieldProperties.set("value",field.value);
        formCheckBoxFields.set(fieldName, fieldProperties);
      }
    }
    return formCheckBoxFields;
  }

  loadTextFields(smartlistName: string){
    let formTextFields = new Map<string, Map<string, any>>();
    let smartlist = this.smartlists.get(smartlistName);
    // console.log("smatlist: ", smartlist)
    
    for (var fieldName in smartlist) {
      console.log("fieldName:" + fieldName);
      let field: any = smartlist[fieldName];
      let fieldProperties: Map<string, any> = new Map<string, any>();
      // for(var fieldPropertiesName in field){
      for(let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()){
        // if( environment.smartilistJcrfieldProperties.includes(fieldPropertiesName) && fieldPropertiesName.toLowerCase() != "value" && ){
        console.log("jcrFieldPropertyName:" + jcrFieldPropertyName);
        if( jcrFieldPropertyName.toLowerCase() != "value" || jcrFieldPropertyName.toLowerCase() != "PropertyType"){
          
          console.log("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
          // fieldProperties.set(fieldPropertiesName,smartlist[fieldName][fieldPropertiesName]);
          fieldProperties.set(jcrFieldPropertyName,field[jcrFieldPropertyName]);
          
        } 
      }
      let values: Map<string, any> = new Map<string, any>();
      if (field["PropertyType"] == FieldType.dropdownlist ){
        fieldProperties.set("value",field.value);
        formTextFields.set(fieldName, fieldProperties);
      }
    }
    return formTextFields;
  }

  // loadFields(smartlistName: string){
  //   let formRadioFields = new Map<string, Map<string, any>>();
  //   let smartlist: any;
  //   // let mapFields = new Map<string, FormField>() 
  //   let mapFields = new Map<string, any>() 
  //   this.getService.getSmartlist(smartlistName).subscribe(ele=>{
  //     // let responseBody: any = []; 
  //     // smartlist.push(ele.responseBody);
  //     // smartlist = ele.responseBody;
  //     smartlist = JSON.parse(JSON.stringify(ele.responseBody));
  //   }, 
  //   error => console.log("Error: ", error),
  //   () => {
  //     // console.log("smartlist: ", smartlist.toString)
  //     console.log("smatlist: ", smartlist)
      
  //     for (var fieldName in smartlist) {
  //         console.log("fieldName:" + fieldName);
  //         let field: any = smartlist[fieldName];
  //         let fieldProperties: Map<string, any> = new Map<string, any>();
  //         // for(var fieldPropertiesName in field){
  //         for(let jcrFieldPropertyName of this.smartilistJcrfieldProperties.keys()){
  //           // if( environment.smartilistJcrfieldProperties.includes(fieldPropertiesName) && fieldPropertiesName.toLowerCase() != "value" && ){
  //           console.log("jcrFieldPropertyName:" + jcrFieldPropertyName);
  //           if( jcrFieldPropertyName.toLowerCase() != "value" || jcrFieldPropertyName.toLowerCase() != "PropertyType"){
              
  //             console.log("field[" + jcrFieldPropertyName + "]:" + field[jcrFieldPropertyName]);
  //             // fieldProperties.set(fieldPropertiesName,smartlist[fieldName][fieldPropertiesName]);
  //             fieldProperties.set(jcrFieldPropertyName,field[jcrFieldPropertyName]);
             
  //           } 
  //         }
  //         let values: Map<string, any> = new Map<string, any>();
  //         switch (field["PropertyType"]) {
  //           case FieldType.radio_button:
  //             for(var element in field.value){
  //               // this.setOption(element,  "true" );
  //                 values.set(field.value[element], field.value[element]);    
  //               };
  //             fieldProperties.set("values",values);
  //             // this.formRadioFields.set(fieldName, fieldProperties);
  //             formRadioFields.set(fieldName, fieldProperties);
  //             break;
  //           case FieldType.dropdownlist:
  //             for(var element in field.value){
  //             // this.setOption(element,  "true" );
  //               values.set(field.value[element], field.value[element]);    
  //             };
  //             fieldProperties.set("values",values);
  //             this.formDdlFields.set(fieldName, fieldProperties);
  //             break;
  //           case FieldType.checkbox:
  //             fieldProperties.set("value",field.value);
  //             this.formCheckboxFields.set(fieldName, fieldProperties);
  //             break;
  //           case FieldType.text:
  //             fieldProperties.set("value",field.value);
  //             this.formTextFields.set(fieldName, fieldProperties);
  //             break;
  //           default:
              
  //             break;
  //           }
  //         }
  //       }
  //     );
  // }
}
