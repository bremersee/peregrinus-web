import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Node} from '../model/node';

@Injectable({
  providedIn: 'root'
})
export class BasecampBusService {

  private displayOnMapState = new Subject<Node>();
  private displayOnMap = new Subject<Node>()

  constructor() {
  }

  sendNewDisplayOnMapState(node: Node) {
    this.displayOnMapState.next(node);
  }

  getDisplayOnMapState(): Observable<Node> {
    return this.displayOnMapState.asObservable();
  }

  sendDisplayOnMap(node: Node) {
    this.displayOnMap.next(node);
  }

  getDisplayOnMap(): Observable<Node> {
    return this.displayOnMap.asObservable();
  }
}
