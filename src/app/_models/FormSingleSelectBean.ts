import { FormField } from "./form-field";

export class FormSingleSelectSmartlist{
    private name: string;
    private fields: Map<string, FormField>;

    constructor(){
        this.fields = new Map<string, FormField>();
    }
    public setName(name: string){
        this.name=name;
    }

    public getName(){
        return this.name
    }

    /**
     * addFormFied
formField: FormField   
this.fields.  */
    public addFormField(formField: FormField) {
        this.fields.set(formField.getPropertyName(),formField);
        
    }

    /**
     * setFormFields
     */
    public setFormFields(formFields: Array<FormField>) {
        formFields.forEach(element => {
            this.fields.set(element.getPropertyName(), element)    
        });
    }

    /**
     * getField
     */
    public getField(fieldName: string) {
        return this.fields.get(fieldName)
        
    }

    /**
     * getFormFields
     */
    public getFormFields() {
        let formFields: Array<FormField>;
        this.fields.forEach(element => {
            formFields.push(element);    
        });
        return formFields;
    }
}