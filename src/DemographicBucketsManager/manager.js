import {inject, bindable} from 'aurelia-framework';
import {DemographicRanking} from '../../../Models/DemographicRanking';

@bindable ({name:'selected', attribute:'selected-type'})
@bindable ({name:'selectedBucket', attribute:'selected-bucket'})
@inject(DemographicRanking)
export class LeadFileGen {
	constructor(model) {
    this.model = model;
    this.EditState = false;
    this.AlertState = false;

    this.message = {msg:"hello", level:"info"}; //success, info, warning, danger
  }

  SaveBucket(bucket){
    if (bucket.ID) {
      this.model.UpdateBucket(bucket)

    } else {
      this.model.CreateBucket(bucket)

    }

  }

  DeleteBucket(id){
    this.model.DeleteBucket(id, (id, success, error) => {
        if (!error && success) {
        this.EditState = false;
        this.selectedBucket = {}
        this.message = {msg:`Successfully deleted {id}`, level:"success"};
      } else {
        this.message = {msg:`Aurelia sucks`, level:"warning"};
      }
      this.AlertState = true;
    })
      
  }

  NewBucket (){
    this.selectedBucket = {}
    this.EditState = true;
  }
}
