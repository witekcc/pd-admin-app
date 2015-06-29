import {inject} from 'aurelia-framework';
import {DemographicRanking} from '../../../Models/DemographicRanking';

@inject(DemographicRanking)
export class BucketManager {
	constructor(model) {
    this.model = model;
    this.EditState = false;
    this.AlertState = false;

    this.message = {
      msg:null,
      level:null, //success, info, warning, danger
    };
    
    this.clearSelected();
    
    this.updateStatus = (id, success, error) => {
      if (!error && success) {
        this.EditState = false;
        this.selectedBucket = {};
        this.message = {msg:`Success ${id}`, level:"success"};
      } else {
        console.dir(error);
        this.message = {msg:`Error: ${error.statusText}`, level:"danger"};
      }
      this.AlertState = true;
    };
  }

  clearSelected(){
    this.selectedBucket = {
      weight: null,
      name: null,
      type: null,
      bucket: [null]
    };
  }

  SaveBucket(bucket){
    if (bucket.id) {
      this.model.UpdateBucket(bucket, this.updateStatus);
    } else {
      this.model.CreateBucket(bucket, this.updateStatus);
    }
  }

  DeleteBucket(id){
    this.clearSelected();
    this.model.DeleteBucket(id, this.updateStatus);
  }

  NewBucket (){
    this.clearSelected();
    this.EditState = true;
  }

  CancelEdit() {
    this.clearSelected();
    this.EditState = false;
  }
}
