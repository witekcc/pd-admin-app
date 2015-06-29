import {bindable} from 'aurelia-framework';

export class BucketSelector {
  @bindable buckets;
  @bindable bucket;

  editBucket(bucket){
    this.bucket = bucket;
    this.$parent.EditState = true;
  }

  bind(bindingContext) {
    this.$parent = bindingContext;
  }
}
