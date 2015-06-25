import {inject, bindable, computedFrom} from 'aurelia-framework';
import {DemographicRanking} from '../../../Models/DemographicRanking';

@bindable ({  name:'selectedType', attribute:'selected-type'})
@bindable ({  name:'buckets', attribute:'buckets'})
export class BucketSelector {
	constructor() {
    this.buckets = null;
    this.selectedType= null;
  }

  @computedFrom('buckets', 'selectedType')
  get selectedBucket(){
    return this.buckets[this.selectedType];
  }

}
