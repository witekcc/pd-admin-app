
import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
 
export class IdKeyValueCollection {

	constructor(http, items, urlPart, parent){
		this.items = items;
		this.http = http;
		this.urlPart = urlPart;
		this.parent = parent;
		this.selectedItem = null;
		this.isEnumerable = false;

	}

	SelectItem(item){
		if(item === this.selectedItem)
		{
			this.selectedItem = null;
		}
		else
		{
			this.selectedItem = item;
		}
	}	

	New(){
		let item = {Id : 0, Key : "", Value : ""};
		this.items.push(item);
		this.SelectItem(item);
		return item;
	}

	Update(){
		if(this.selectedItem == null)
			return;

		let url = "http://localhost:9002/" + this.parent.Id + this.urlPart;
		let item = this.selectedItem;

		this.http.createRequest(url)
		.asPost()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(item))
		.send().then(function (httpResponse){
		console.log(httpResponse);
		item.Id = parseInt(httpResponse.response);

		});
	}

	Delete() {
		if(this.selectedItem == null)
			return;

		let url = "http://localhost:9002/" + this.parent.Id + this.urlPart;
		let item = this.selectedItem;
		
		this.selectedItem = null;

		this.http.createRequest(url)
		.asDelete()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(item))
		.send().then(function (httpResponse){
		console.log(httpResponse);
		});

		let index = this.items.indexOf(item);
		if (index > -1) {
		    this.items.splice(index, 1);
		}


	}

}