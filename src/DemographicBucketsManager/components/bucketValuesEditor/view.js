import {inject, bindable} from 'aurelia-framework';

@bindable ({  name:'bucket', attribute:'bucket'})
export class BucketValuesEditor {
  constructor(http) {
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
