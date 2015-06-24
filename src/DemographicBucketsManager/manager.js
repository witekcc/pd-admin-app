import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Services} from '../services';

@inject(HttpClient)
export class LeadFileGen {
	constructor(http) {
		this.http = http;
		this.campaignId = 4890;
  		this.rowLimit = 10;
  		//this.outputTemplate = "Id, Email, Name, Location\n{{range $row := . }}{{ $row.uuid }},{{ $row.email }},{{ $row.first_name }} {{ $row.last_name }},\"{{ $row.city }}, {{ $row.state }}, {{ $row.zipcode }}\"\n{{ end }}\n";
  		this.results = "";
      this.generate();
  }


  generate() {
  	var url = Services.CampaignBuckets();
  	var that = this;

  	this.http.get(url).then(function (httpResponse) {

  		that.setResults(httpResponse.response);
  		
  	});

  	
  }

  setResults(results){
  	this.results = results;
      console.log(results);
  }

}