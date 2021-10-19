import { Component, Input, OnInit } from '@angular/core';
import { GETService } from '../get.service';
import { JcrHelper } from '../_helpers/jcrhelper';
// import { ColType, FormMultiSelectTemplate, RowType } from '../_models/FormMultiSelectTemplate';
import { Cell, ColType, FormMultiSelectTemplate} from '../_models/FormMultiSelectTemplate';
import { MultiSelectFieldNames } from '../_models/multi-select-field-names.enum';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-test-multi',
  templateUrl: './test-multi.component.html',
  styleUrls: ['./test-multi.component.css']
})
export class TestMultiComponent implements OnInit {


  template!: FormMultiSelectTemplate;
  @Input()
  multiselectFieldName!: string;
  rowsPreferitiName!: string[];
  rowsDropdownName!: string[];
  columnsType!: ColType[];

  headersName!: string[];

  @Input()
  jcrDataPrefix!: string;
  // cellsIdNameValue: Map<String, String>;

  @Input() baseColWidths: string[] = [];
  @Input() dynamicColWidth: string = "";
  /*
    baseColWidths: string[];
    dynamicColWidth: string;

  */

  // schedaSlingAttributeBean: SchedaSlingAttributeBean[];
  
  constructor(private getService: GETService) {}

  ngOnInit(): void {
    this.template = new FormMultiSelectTemplate();
    this.template.colWidths = [];
    this.baseColWidths.forEach(baseColWidth => this.template.colWidths.push(baseColWidth));

    this.getService.getWorkingData().subscribe(nodeCard => {
      if (this.multiselectFieldName === MultiSelectFieldNames.MONITORAGGIO_PARAMETRI_VITALI){
        this.template.label = MultiSelectFieldNames.MONITORAGGIO_PARAMETRI_VITALI;
        this.template.code = this.jcrDataPrefix;
        this.template.jcrNodeAttrHeaderName = `${this.jcrDataPrefix}header`;
        this.template.jcrNodeAttrValueName = `${this.jcrDataPrefix}cols`;

        this.template.originDefaultColumnsNum= 4;
        this.template.originPreferitiRowsNum= 5;
        this.template.moreColumns = true;

        this.rowsDropdownName = ['Altro'];

        // this.getService.getWorkingData().subscribe(nodeCard => {
        let headers = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrHeaderName);
        let rows = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrValueName);

        if ((headers != null && headers != undefined) && (rows != null && rows != undefined) ){
            console.log(headers);
            console.log(rows);
            this.template.columns = JSON.parse(headers);
            this.template.preferiti = JSON.parse(rows);

            // this.columnsType=[];
            this.template.rowsColType = [];
            this.template.preferiti[0].cells.forEach((cell, index) => {
              // this.columnsType.push(cell.type);
              this.template.rowsColType.push(cell.type)
              this.template.colWidths.push(this.dynamicColWidth);
            });
        } else {
        // });

            this.template.columns = [
              {name: 'PARAMETRO', id: this.makeHeaderInputIdName('PARAMETRO', 0), type: ColType.text, value: ""},
              // todo set default value now
              {name: 'ORA', id: this.makeHeaderInputIdName('ORA', 1), type: ColType.time, value: ""},
              {name: 'ORA', id: this.makeHeaderInputIdName('ORA', 2), type: ColType.time, value: ""},
              {name: 'ORA', id: this.makeHeaderInputIdName('ORA', 3), type: ColType.time, value: ""}

            ];

            this.rowsPreferitiName = ['Saturazione O2', 
                                      'Frequenza Cardiaca', 
                                      'Pressione Arteriosa',
                                      'EtC02',
                                      'Respiro'];

            
          // this.columnsType = [ColType.text, ColType.text, ColType.text];
          this.template.rowsColType = [ColType.text, ColType.text, ColType.text];
            this.populatePreferiti();  
          }
          this.populateDropdown();
      } 
      else if(this.multiselectFieldName === MultiSelectFieldNames.SEDAZIONE){
        this.template.label = MultiSelectFieldNames.SEDAZIONE;
        this.template.code= this.jcrDataPrefix;
        this.template.jcrNodeAttrHeaderName = `${this.jcrDataPrefix}header`;
        this.template.jcrNodeAttrValueName = `${this.jcrDataPrefix}cols`;

        this.template.originDefaultColumnsNum= 4;
        this.template.originPreferitiRowsNum= 5;

        this.template.moreColumns = false;

        let headers = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrHeaderName);
        let rows = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrValueName);


        this.rowsDropdownName = ['Buscopan 20mg/ml', 
                                 'Flumazenil 0,1mg/ml'];

        if ((headers != null && headers != undefined) && (rows != null && rows != undefined) ){
            console.log(headers);
            console.log(rows);
            this.template.columns = JSON.parse(headers);
            this.template.preferiti = JSON.parse(rows);
            // this.columnsType=[];
            this.template.rowsColType = [];
            this.template.preferiti[0].cells.forEach((cell, index) => {
              // this.columnsType.push(cell.type);
              this.template.rowsColType.push(cell.type);
            });
          } else {

            this.template.columns = [
              {name: 'MEDICINALE', id: this.makeHeaderInputIdName('MEDICINALE', 0), type: ColType.text, value: ""},
              {name: 'DOSAGGIO', id: this.makeHeaderInputIdName('DOSAGGIO', 1), type: ColType.text, value: ""},
              {name: 'PRESCRITTORE', id: this.makeHeaderInputIdName('PRESCRITTORE', 2), type: ColType.text, value: ""},
              {name: 'INFERMIERE', id: this.makeHeaderInputIdName('INFERMIERE', 3), type: ColType.text, value: ""}
            ];

            this.rowsPreferitiName = ['Lidocaina Cetrinomio bromuro spray', 
                                      'MIDAZOLAM 5mg/ml', 
                                      'FENTANEST',
                                      'N.ButilBromuro',
                                      'GLUCAGONE'];
          // this.columnsType = [ColType.text, ColType.firma, ColType.firma];
          this.template.rowsColType = [ColType.text, ColType.firma, ColType.firma];
            this.populatePreferiti();
        }
        this.populateDropdown();

      } else if(this.multiselectFieldName === MultiSelectFieldNames.TRACCIABILITA_DISPOSITIVI){
        this.template.label = MultiSelectFieldNames.TRACCIABILITA_DISPOSITIVI;
        this.template.code= this.jcrDataPrefix;
        this.template.jcrNodeAttrHeaderName = `${this.jcrDataPrefix}header`;
        this.template.jcrNodeAttrValueName = `${this.jcrDataPrefix}cols`;
        
        this.template.originDefaultColumnsNum= 3;
        this.template.originPreferitiRowsNum= 0;
        this.template.moreColumns = false;

        let headers = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrHeaderName);
        let rows = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrValueName);

        this.rowsDropdownName = ['PINZA BIOPSIA',
                                'AGO SCLEROSI',
                                'ANSA PICCOLA 1,5',
                                'PIASTRE ELETTROBISTURI',
                                'RETINO PICCOLO','GARZE', 
                                'PROVETTA PER CENTRIFUGA',
                                'BISTURI'];
        this.template.rowsColType = [ColType.text, ColType.link];
        
        if ((headers != null && headers != undefined) && (rows != null && rows != undefined) ){
            console.log(headers);
            console.log(rows);
            this.template.columns = JSON.parse(headers);
            this.template.preferiti = JSON.parse(rows);
            // this.columnsType=[];
            this.template.rowsColType=[];
            if (this.template.preferiti.length > 0){
              this.template.rowsColType = [];
              this.template.preferiti[0].cells.forEach((cell, index) => {
                // this.columnsType.push(cell.type);
                this.template.rowsColType.push(cell.type);
              });
            }

          } else {
            this.template.columns = [
              {name: 'DISPOSITIVO', id: this.makeHeaderInputIdName('DISPOSITIVO', 0), type: ColType.text, value: ""},
              {name: 'NOTE', id: this.makeHeaderInputIdName('NOTE', 1), type: ColType.text, value: ""},
              {name: '', id: this.makeHeaderInputIdName('', 2), type: ColType.text, value: ""}
            ];

            /* this.rowsPreferitiName = ['PINZA BIOPSIA',
                                      'AGO SCLEROSI',
                                      'ANSA PICCOLA 1,5',
                                      'PIASTRE ELETTROBISTURI',
                                      'RETINO PICCOLO']; */
            
            this.rowsPreferitiName = []        
            // this.columnsType=[ColType.text, ColType.link];
            
            this.populatePreferiti();
          }
          this.populateDropdown();
      } 
      else {
      // questo è un caso template
        this.template.label = 'TestMulti'
        this.template.code= "TESMU";
        this.template.jcrNodeAttrHeaderName = "TESMU" +"header";
        this.template.jcrNodeAttrValueName = "TESMU" +"cols";

        this.template.originDefaultColumnsNum= 3;
        this.template.originPreferitiRowsNum= 2;
        this.template.moreColumns = true;

        this.rowsPreferitiName = ['farmaco1',
          'farmaco2',
          'farmaco3'];
        let headers = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrHeaderName);
          let rows = JcrHelper.getJcrStringValue(nodeCard, this.template.jcrNodeAttrValueName);

          if ((headers != null && headers != undefined) && (rows != null && rows != undefined) ){
            console.log(headers);
            console.log(rows);
            this.template.columns = JSON.parse(headers);
            this.template.preferiti = JSON.parse(rows);

            // this.columnsType = [];
            this.template.rowsColType=[];
            this.template.preferiti[0].cells.forEach((cell, index) => {
              // this.columnsType.push(cell.type);
              this.template.rowsColType.push(cell.type)
            });

          } else {
    
            this.template.columns = [
              {name:'col1', id: this.makeHeaderInputIdName('col1', 0), type: ColType.text, value: ""},
              {name:'col2', id: this.makeHeaderInputIdName('col2', 1), type: ColType.text, value: ""},
              {name:'col3', id: this.makeHeaderInputIdName('col3', 2), type: ColType.text, value: ""}
              ];
              
            // this.columnsType = [ColType.text, ColType.text, ColType.text];
            this.template.rowsColType = [ColType.text, ColType.text, ColType.text];
              this.rowsDropdownName = ['farmaco4', 
                                      'farmaco5',
                                      'farmaco6'];
              
              this.populatePreferiti();
              
          }
          this.populateDropdown();
      }
    });

    
    
    
  }

  populatePreferiti(){
    this.template.preferiti=[];
    this.rowsPreferitiName.forEach((rowName, rowIndex) => {
      let cells: Cell[] = [];
      // this.columnsType.forEach((colName, colIndex) => {
        this.template.rowsColType.forEach((colType, colIndex) => {
        cells.push({type: colType, id: this.makeCellInputIdName(rowName, rowIndex, colIndex), value: ""});
        
      });
      this.template.preferiti.push({name:rowName, cells});
      
    });
  }

  populateDropdown(){
    this.template.dropdownvalues = [];
    this.rowsDropdownName.forEach((rowName, rowIndex) => {
      
      let cells: Cell[] = [];
      // this.columnsType.forEach((colName, colIndex) => {
      this.template.rowsColType.forEach((colType, colIndex) => {
        cells.push({type: colType, id: this.makeCellInputIdName(rowName, rowIndex , colIndex), value: ""});
        
      });
      this.template.dropdownvalues.push({name:rowName, cells});
    });
  }

  makeCellInputIdName(rowName: string, rowIndex: number, colIndex: number){
    let cellInputIdName = rowName.replace(/ /g, "_") + "_row[" + rowIndex + "]_col[" + colIndex + "]" ;
   return cellInputIdName;
  }

  makeHeaderInputIdName(rowName: string, colIndex: number){
    let cellInputIdName = rowName.replace(/ /g, "_") + "_header[" + colIndex + "]" ;
   
    return cellInputIdName;
}

}
