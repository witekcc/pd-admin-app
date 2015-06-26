import {bindable} from 'aurelia-framework';

@bindable ({  name:'message', attribute:'message'})
export class BucketValuesEditor {
  constructor() {
    this.message = null;
  }
}
