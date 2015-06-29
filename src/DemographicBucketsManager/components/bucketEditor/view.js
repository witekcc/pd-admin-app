import {bindable} from 'aurelia-framework';

export class BucketEditor {
  @bindable bucket;

  bind(bindingContext) {
    this.$parent = bindingContext;
  }
}
