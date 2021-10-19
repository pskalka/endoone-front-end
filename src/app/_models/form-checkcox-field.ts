import { FieldType } from "./field-type.enum";
import { FormField } from "./form-field";

export class FormCheckcoxField extends FormField{


    private value: boolean;

    constructor(propertyType: string){
        super(propertyType);
        // this.setPropertyType(FieldType.checkbox);
        this.value = false;
    }
    /**
     * setValue
value: boo     */
    public check() {
        this.value = true;
    }

    /**
     * uncheck
     */   
    public uncheck() {
        this.value = false;
    }

    /**
     * isChecked
     */
    public isChecked() {
        return this.value;
    }
}
