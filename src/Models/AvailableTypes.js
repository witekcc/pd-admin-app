import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Services} from 'services';
 
 @inject(HttpClient)
export class AvailableTypes {
	constructor(http){
		let url = Services.LeadConfig() + "types/";

		this.ActionTypes = [];
		this.CompressionTypes = [];

 		let that = this;

		http.get(url).then(function (httpResponse){
		
			let types = JSON.parse(httpResponse.response);

			that.ActionTypes = types.ActionTypes;
			that.CompressionTypes = types.CompressionTypes;
		});
	}
	
}