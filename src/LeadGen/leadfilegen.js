import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class LeadFileGen {
	constructor(http) {
		this.http = http;
		this.campaignId = 4890;
  		this.rowLimit = 10;
  		this.outputTemplate = "Id, Email, Name, Location\n{{range $row := . }}{{ $row.uuid }},{{ $row.email }},{{ $row.first_name }} {{ $row.last_name }},\"{{ $row.city }}, {{ $row.state }}, {{ $row.zipcode }}\"\n{{ end }}\n";
  		this.results = "";
  }


  generate() {
  	var url = "http://192.168.155.165:9001/generate/" + this.campaignId + "?template=" + this.outputTemplate + "&limit=" + this.rowLimit;
  	var that = this;

  	this.http.get(url).then(function (httpResponse) {

  		that.setResults(httpResponse.response);
  		
  	});
  	
  }

  setResults(results){
  	this.results = results;
  }

}