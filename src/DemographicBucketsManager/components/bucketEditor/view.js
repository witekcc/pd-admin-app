import {inject, bindable} from 'aurelia-framework';

@bindable ({  name:'bucket', attribute:'bucket'})
export class BucketEditor {
  constructor(http) {
    this.Clear();
  }

    bind(bindingContext) {
    this.$parent = bindingContext;
  }

  Clear (){
    this.bucket = null
  }
}
