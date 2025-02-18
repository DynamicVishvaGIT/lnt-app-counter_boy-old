import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }
  private dataObserved = new BehaviorSubject<any>('');
  private sharingObject: any;


    publish(param):void {
      this.dataObserved.next(param);
    }
    getEvent():Observable<any>{
      return this.dataObserved.asObservable();
      }
    get sharingValue() {
        return this.sharingObject
    }
    
    set sharingValue(obj) {
        this.sharingObject = obj;
      }
}
