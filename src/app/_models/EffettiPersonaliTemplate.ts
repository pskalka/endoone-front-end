export class EffettiPersonaliTemplate {
    
    label!:string;
    radiovalues!:Value[];
    checkbox!:ValueCheckbox[];
}

export interface Value {
    value: string;
    viewValue: string;
  }

export interface ValueCheckbox{
    viewValue: string;
    value:boolean;
}