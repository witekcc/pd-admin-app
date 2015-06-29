import {bindable, syncChildren} from 'aurelia-framework';

@syncChildren("lis", "lisChanged", "li")
export class BucketValuesEditor {
  @bindable bucket;

  constructor() {
    this.bucket = null;
  }

  AddVal(index){
    if (this.bucket) {
      this.bucket.splice(index + 1, 0, null);
    }
  }

  lisChanged() {
    if (this.lis.length !== this.bucket.length){
      this.bucket = this.bucket.filter(e => {
        return (e !== 'undefined');
      });
      console.log("lis changed! Count: " + this.lis.length);
     }
  }
   DeleteVal(index){
    if (this.bucket) {
      this.bucket.splice(index, 1);
      if (this.bucket.length === 0){
        this.bucket = [null];
      }
    }
  }
}
