import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class ConstantsService {

  constructor(private af: AngularFire) { }

  getConstants(){
      return this.af.database.list('constants');
  }

}
