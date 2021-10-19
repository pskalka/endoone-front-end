import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GETService } from '../get.service';
import { POSTService } from '../post.service';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';

@Injectable({
  providedIn: 'root'
})
export class SchedaCleanerService {

  constructor(
    public serviceGET: GETService,
    private postService: POSTService
  ) { }

    public cleanScheda(d : SchedaSlingAttributeBean[]) : Observable<any> {
      let attributeNames: string[] = [];
      while (d.length > 0) {
          var item = d.pop();
          if (item === null || item === undefined) {
            break;
          } else {
            if ("jcr:primaryType".localeCompare(item.name) != 0) {
              attributeNames.push(item.name);
            }
          }
        }
      return this.postService.deleteAttributes(attributeNames);
    }

}
