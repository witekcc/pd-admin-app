import {inject, bindable} from 'aurelia-framework';

@bindable ({  name:'selected', attribute:'selected'})
@bindable ({  name:'options', attribute:'options', changeHandler:'optionsChanged'})
export class BucketTypeSelector {
  constructor() {
    this.selected= null;
    this.options= null;
  }

  optionsChanged(){
    this.selected = this.options[0];
  }
}

