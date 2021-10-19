import { FieldType } from "./field-type.enum";
import { FormField } from "./form-field";

export class FormRadioButtonField extends FormField{

    private values: Map<string, string>;

    constructor(propertyType: string){
        super(propertyType);
        this.values = new Map<string, string>();
    }

    public addValue(key: string, value: string) {
        this.values.set(key,value);        
    }

    
    public setValues(values: Map<string, string>) {
        this.values = values;
    }

   
    public getValue(key: string) {
    return this.values.get(key);
}

    /**
     * getValues
     */
    public getValues() {
        return this.values;
    }

}
