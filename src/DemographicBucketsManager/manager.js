import {inject, bindable} from 'aurelia-framework';
import {DemographicRanking} from '../../../Models/DemographicRanking';

@bindable ({name:'selected', attribute:'selected-type'})
@bindable ({name:'selectedBucket', attribute:'selected-bucket'})
@inject(DemographicRanking)
export class LeadFileGen {
	constructor(model) {
    this.model = model;
  }
}
