export class FormMultiSelectTemplate {
    
    label:string;
    code:string;
    
    
    columns:Header[];

    colWidths: string[];

    preferiti:Row[];
    dropdownvalues:Row[];
    moreColumns:boolean;
    jcrNodeAttrValueName: string;
    jcrNodeAttrHeaderName: string;
    
    originPreferitiRowsNum: number;
    originDefaultColumnsNum: number;

    rowsColType: ColType[];
}

export interface Value {
    value: string;
    viewValue: string;
  }

  

  export interface Row{

    name:string;
    cells: Cell[];
  }

  export interface Cell{
    type: ColType;
    id: string;
    value: string;
  }

  export interface Header{

    name:string;
    id: string;
    type:ColType;
    value: string;
  
  }

export enum ColType {
  text='text',
  number='number',
  percentage='percentage',
  firma='firma',
  link='link',
  time='time'

}

// export enum ColHeaderType {
//   text='text',
//   time='time'

// }