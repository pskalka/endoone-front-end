import { FieldType } from "./field-type.enum";
import { FormField } from "./form-field";

export class FormDropdownlistField extends FormField{


    private values: Map<string, string>;

    constructor(propertyType: string){
        super(propertyType);
        
        this.values = new Map<string, string>();
    }

    /**
     * addValue
key: string, value: string     */
    public addValue(key: string, value: string) {
        this.values.set(key,value);
    }

    /**
     * getValue
key: string     */
    public getValue(key: string) {
        return this.values.get(key);
    }

    /**
     * setValues
values: Map<string, string>     */
    public setValues(values: Map<string, string>) {
        this.values = values;
    }

     /**
     * getValues
     */
      public getValues() {
        return this.values;
    }

}
