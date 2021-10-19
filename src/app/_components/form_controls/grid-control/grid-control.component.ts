import { Component, Input, OnInit } from '@angular/core';
import { GETService } from 'src/app/get.service';
import { Utils } from 'src/app/_helpers/utils';
import { Cell, ColType, FormMultiSelectTemplate } from 'src/app/_models/FormMultiSelectTemplate';
import { GridModel } from 'src/app/_models/grid-model';
import { Smartlist } from 'src/app/_models/smartlist';
import { GridModelService } from 'src/app/_services/grid-model.service';

@Component({
  selector: 'app-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.css']
})
export class GridControlComponent implements OnInit {

  // @Input() baseColWidths: string[] = [];
  // @Input() dynamicColWidth: string = "";
  // @Input() jcrDataPrefix: string;
  // @Input() multiselectFieldName: string;
  // @Input() baseColWidths: string[] = [];
  // @Input() dynamicColWidth: string = "";
  // @Input() jcrDataPrefix: string;
  // @Input() multiselectFieldName: string;

  @Input()
  smartlistName!: string;

  baseColWidths: string[] = [];
  columnsType!: ColType[];
  headersName!: string[];
  rowsDropdownName!: string[];
  rowsPreferitiName!: string[];
  smartlist!: Smartlist;
  template!: FormMultiSelectTemplate;


  constructor(
    private getService: GETService,
    private gridModelService: GridModelService) { }

  ngOnInit() {
    let gm : GridModel = new GridModel();
    gm.PropertyName = "monitoraggio_parametri_vitali_grid";
    this.gridModelService.Load(gm);

    this.template = new FormMultiSelectTemplate();
    this.template.colWidths = [];
    this.smartlist = new Smartlist(this.getService, this.smartlistName);
    this.smartlist.onLoadComplete = () => {
      let columnWidths = this.smartlist.getCheckBoxFields().get("column_widths");
      if (columnWidths != null) {
        let values = columnWidths.get("value") as string[];
        values.forEach(v => this.template.colWidths.push(v));
      }
      let mp: Map<string, any> = this.smartlist.smartlists.get(this.smartlistName) as Map<string, any>;
      let sl: Map<string, any> = mp.get(this.smartlistName) as Map<string, any>;
      this.template.label = sl.get("PropertyDescription");
      // this.template.code = 
      let y = 2;
    };
    // this.baseColWidths.forEach(baseColWidth => this.template.colWidths.push(baseColWidth));
  }



  populatePreferiti() {
    this.template.preferiti = [];
    this.rowsPreferitiName.forEach((rowName, rowIndex) => {
      let cells: Cell[] = [];
      // this.columnsType.forEach((colName, colIndex) => {
      this.template.rowsColType.forEach((colType, colIndex) => {
        cells.push({ type: colType, id: this.makeCellInputIdName(rowName, rowIndex, colIndex), value: "" });

      });
      this.template.preferiti.push({ name: rowName, cells });

    });
  }

  populateDropdown() {
    this.template.dropdownvalues = [];
    this.rowsDropdownName.forEach((rowName, rowIndex) => {

      let cells: Cell[] = [];
      // this.columnsType.forEach((colName, colIndex) => {
      this.template.rowsColType.forEach((colType, colIndex) => {
        cells.push({ type: colType, id: this.makeCellInputIdName(rowName, rowIndex, colIndex), value: "" });

      });
      this.template.dropdownvalues.push({ name: rowName, cells });
    });
  }

  makeCellInputIdName(rowName: string, rowIndex: number, colIndex: number) {
    let cellInputIdName = rowName.replace(/ /g, "_") + "_row[" + rowIndex + "]_col[" + colIndex + "]";
    return cellInputIdName;
  }

  makeHeaderInputIdName(rowName: string, colIndex: number) {
    let cellInputIdName = rowName.replace(/ /g, "_") + "_header[" + colIndex + "]";

    return cellInputIdName;
  }

}
