import { FieldType } from "./field-type.enum";
import { FormCheckcoxField } from "./form-checkcox-field";
import { FormDropdownlistField } from "./form-dropdownlist-field";
import { FormRadioButtonField } from "./form-radio-button-field";
import { FormTextField } from "./form-text-field";

export class FormField {

    private propertyAuto!: boolean;
    private propertyDescription!: string;
    private propertyMulti!: boolean;
    private propertyName!: string;
    private propertyProtected!: boolean;
    private propertyType!: string;
    
    // private value: string;
    // private values: string[];

    // constructor(propertyAuto: boolean, propertyDescription: string,
    //             propertyMulti: boolean, propertyName: string,
    //             propertyProtected: boolean, propertyType: string){
    constructor(propertyType: string){    
        // this.setPropertyAuto(propertyAuto);
        // this.setPropertyDescription(propertyDescription);
        // this.setPropertyMulti(propertyMulti);
        // this.setPropertyName(propertyName);
        // this.setPropertyProtected(propertyProtected);
        this.setPropertyType(propertyType);
        
    }
    
    public setPropertyAuto(propertyAuto: boolean){
        this.propertyAuto = propertyAuto;
    }
    public getPropertyAuto(){
        return this.propertyAuto;
    }

    public setPropertyDescription(propertyDescription: string){
        this.propertyDescription = propertyDescription;
    }
    public getPropertyDescription(){
        return this.propertyDescription;
    }

    public setPropertyMulti(propertyMulti: boolean){
        this.propertyMulti = propertyMulti;
    }

    public getPropertyMulti(){
        return this.propertyMulti;
    }

    public setPropertyName(propertyName: string){
        this.propertyName = propertyName;
    }
    public getPropertyName(){
        return this.propertyName;
    }
    
    public setPropertyProtected(propertyProtected: boolean){
        this.propertyProtected = propertyProtected;
    }

    public getPropertyProtected(){
        return this.propertyProtected;
    }

    protected setPropertyType(propertyType: string){
        this.propertyType = propertyType;
    }
    public getPropertyType(){
        return this.propertyType;
    }

    /**
     * getPropertyValue
   
   return this. */
    // public getPropertyValue() {
    //     return this.propertyValue;
    // }
}
