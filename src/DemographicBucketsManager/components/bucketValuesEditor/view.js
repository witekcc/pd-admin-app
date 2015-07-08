import {bindable, ObserverLocator, inject} from 'aurelia-framework';

@inject(ObserverLocator)
export class BucketValuesEditor {
  @bindable bucket;

  constructor(observerLocator) {
    this.updateBucketCopy = ()=>{
        this.bucketCopy = this.bucket.filter(e => {
         return (e !== 'undefined');
      });
    };
    observerLocator
      .getObserver(this, 'bucket')
      .subscribe(this.updateBucketCopy);
  }


  AddVal(index){
    if (this.bucket) {
      this.bucket.splice(index + 1, 0, null);
      this.updateBucketCopy();
    }
  }

   DeleteVal(index){
    if (this.bucket) {
      this.bucket.splice(index, 1);
      if (this.bucket.length === 0){
        this.bucket = [null];
      }
      this.updateBucketCopy();
    }
  }

}
