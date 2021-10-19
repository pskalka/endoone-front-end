import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GridModel } from '../_models/grid-model';

@Injectable({
  providedIn: 'root'
})
export class GridModelService {

  constructor(private httpClient: HttpClient) { }

  public Load(gm: GridModel) : Observable<GridModel> {
    let url: string = `${environment.apiUrl}${environment.smartlistJcrPath}/${gm.PropertyName}.children.json`;
    return this.httpClient.get<GridModel>(
      url
    );
  }

}
