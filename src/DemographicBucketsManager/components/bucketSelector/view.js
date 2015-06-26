import {inject, bindable, computedFrom} from 'aurelia-framework';

@bindable ({  name:'selectedType', attribute:'selected-type'})
@bindable ({  name:'buckets', attribute:'buckets'})
@bindable ({  name:'bucket', attribute:'selected-bucket'})
export class BucketSelector {
	constructor() {
    this.buckets = null;
    this.bucekt = null;
    this.selectedType = null;
  }

  editBucket(bucket){
    this.bucket = bucket;
    this.$parent.EditState = true;
  }

      bind(bindingContext) {
    this.$parent = bindingContext;
  }

  @computedFrom('buckets', 'selectedType')
  get selectedBucket(){
    return this.buckets[this.selectedType];
  }
}
