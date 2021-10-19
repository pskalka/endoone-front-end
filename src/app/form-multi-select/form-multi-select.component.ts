import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormMultiSelectTemplate, Row, ColType, Header, Cell } from '../_models/FormMultiSelectTemplate';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';
import { MultiSelectFieldNames } from '../_models/multi-select-field-names.enum';

@Component({
  selector: 'app-form-multi-select',
  templateUrl: './form-multi-select.component.html',
  styleUrls: ['./form-multi-select.component.css']
})
export class FormMultiSelectComponent implements OnInit {
  @Input() template:FormMultiSelectTemplate;
  @ViewChildren('colVal') colVal: QueryList<ElementRef>;

  @Output() saveData = new EventEmitter<string>();
  
  newRowText: string;
  fieldArray: Array<any> = [];
  newColumns: Header[] = [];
  multiSelectFieldNames = MultiSelectFieldNames;
  private newRow: any = {};
  // originPreferitiRowsNum: number;
  // originDefaultColumnsNum: number;
  
  

  constructor(private postService: POSTService) { }
  
  ngOnInit() {
    // this.originPreferitiRowsNum = this.template.preferiti.length;
    // this.originDefaultColumnsNum = this.template.columns.length;
    //console.log("Griglie:" + this.nomeGriglia);
    
  }

  makeCellInputIdName(rowName: string, rowIndex: number, colIndex: number){
    
    let cellInputIdName = rowName.replace(/ /g, "_") + "_row[" + rowIndex + "]_col[" + colIndex + "]" ;
    
    return cellInputIdName;

  }

  makeHeaderInputIdName(rowName: string, colIndex: number){
    let cellInputIdName = rowName.replace(/ /g, "_") + "_header[" + colIndex + "]" ;
   
    return cellInputIdName;
  }

  
  storeMyValue($event){

    (<HTMLInputElement>document.getElementById('test')).value = $event.name;
    
  }

  

  postData() {
    
    
    console.log("grid: " + JSON.stringify(this.template.preferiti));

    this.postAttribute(this.template.jcrNodeAttrHeaderName, JSON.stringify(this.template.columns), false);
    
    this.postAttribute(this.template.jcrNodeAttrValueName, JSON.stringify(this.template.preferiti), false);
    
  }
  
  eventTest(colID: string){
    console.log((<HTMLInputElement>document.getElementById(colID)).type);
    console.log((<HTMLInputElement>document.getElementById(colID)).value);
  }

  postAttribute(fieldId: string, fieldValue: any, multi: boolean ) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", multi, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  checkFunction(){
    // alert('d');
    console.log('checkFunction')
  }


  addColumn(){

   this.template.preferiti.forEach((row,rowIndex) => {
      row.cells.push({type: ColType.text, id: this.makeCellInputIdName(row.name, rowIndex, row.cells.length), value: ""});
      this.template.rowsColType.push(ColType.text);
   }); 
   // TODO set default value: now
   this.template.columns.push({name: 'ora', id: this.makeHeaderInputIdName('ora', this.template.columns.length) ,type: ColType.time, value: ""})
   this.postData();

  }

  deleteColumn(index) {
    // this.newColumns.splice(index, 1);
    this.template.columns.splice(index, 1);
    
    this.template.preferiti.forEach((row, rowIndex) => {
      row.cells.splice(index -1, 1);
      this.template.rowsColType.slice(index -1, 1);
      row.cells.forEach((cell, cellIdx) => {
        cell.id = this.makeCellInputIdName(row.name, rowIndex, cellIdx);

      });

    });
    this.postData();
  }
  
  addRow(){

    let obj : Row;

    if(this.newRowText != undefined && this.newRowText.trim().length > 0){
          
      let cells: Cell[] = [];
      // this.template.preferiti[0].cells.forEach((cell, colIndx) => {
      //   cells.push({type: cell.type, 
      //             id: this.makeCellInputIdName(this.newRowText, this.template.preferiti.length, colIndx),
      //             value: ""
      //             });
      // });
      let preferitiRowsNum;
      if (this.template.preferiti.length > 0){
        preferitiRowsNum = this.template.preferiti.length;
      } else {
        preferitiRowsNum = 0;
      }
      this.template.rowsColType.forEach((colType, colIndx) => {
        cells.push({type: colType, 
                  id: this.makeCellInputIdName(this.newRowText, preferitiRowsNum  , colIndx),
                  value: ""
                  });
      });
      obj = {name: this.newRowText, cells: cells}; 
      this.template.preferiti.push(obj);
      this.newRowText = '';
      console.log(this.template.preferiti.length)
      this.postData();
      
    }

  }

  firma(){

    alert('firmato!');
  }

  link(){

    alert('link!');
  }

  deleteRow(index) {
    // this.fieldArray.splice(index, 1);
    this.template.preferiti.splice(index, 1);
    this.template.preferiti.forEach((row, rowIndex) => {
      row.cells.forEach((cell, cellIdx) => {
        cell.id = this.makeCellInputIdName(row.name, rowIndex, cellIdx)
      });

    });
    this.postData();

  }

  isEditColumn(coltype: ColType){
    return coltype == ColType.text || coltype == ColType.number || coltype == ColType.percentage;
  }

  isSignColumn(coltype: ColType){
    return coltype == ColType.firma;
  }

  islinkColumn(coltype: ColType){
    return coltype == ColType.link;
  }

  isTimeColumn(coltype: ColType){
    return coltype == ColType.time;
  }
}
