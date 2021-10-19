import { FieldType } from "./field-type.enum";
import { FormField } from "./form-field";

export class FormTextField extends FormField{
   
    private value:  string;

    constructor(propertyType: string){
        super(propertyType);
        this.value = "";
    }

    /**
     * setValue
value: string   
  */
    public setValue(value: string) {
        this.value = value;
    }

    /**
     * getValue
     */
    public getValue() {
        return this.value;
    }
}
