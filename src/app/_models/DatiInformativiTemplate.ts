export class DatiInformativiTemplate {
    
    label!: string;
    radiovalues!: Value[];
    dropdownvalues!: Value[];
    checkbox!: boolean;
}

export interface Value {
    value: string;
    viewValue: string;
  }