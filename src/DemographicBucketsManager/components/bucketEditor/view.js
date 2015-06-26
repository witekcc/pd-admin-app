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
    this.bucket = {}
  }

  AddVal(){
    if (this.bucket && this.bucket.Bucket) {
        this.bucket.Bucket.push('')
    }
  }

   DeleteVal(val){
    if (this.bucket && this.bucket.Bucket) {

      this.bucket.Bucket = this.bucket.Bucket.filter(function(element, index, array) {
          if (index !== val){
           return true
          }
        })
      console.log("MYDEBUG", this.bucket.Bucket)
    }
  }
}
