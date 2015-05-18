import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
 
 @inject(HttpClient)
export class AvailableTypes {
	constructor(http){
		let url = "http://localhost:9002/types/";

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