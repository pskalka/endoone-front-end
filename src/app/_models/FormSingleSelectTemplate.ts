export class FormSingleSelectTemplate {
    
    label:string;
    radiovalues:Value[];
    dropdownvalues:Value[];
    input:string;
}

export interface Value {
    value: string;
    viewValue: string;
  }