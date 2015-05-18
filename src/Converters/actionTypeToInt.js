import {inject} from 'aurelia-framework';
import {AvailableTypes} from 'Models/AvailableTypes';


@inject(AvailableTypes)
export class ActionTypeToIntValueConverter {
	constructor(types){
		this.Types = types.ActionTypes;
	}

  toView(number) {
  	console.log(number);
    let item = this.Types.find(function(type){ return type.Id == number;});
    return item;
  }

  fromView(action) {
  	console.log(action);
    return action.Id;    
  }
}