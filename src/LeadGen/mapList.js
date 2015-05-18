import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {computedFrom, bindable, inject} from 'aurelia-framework';

@bindable ({  name:'updatefunction', attribute:'update-function'})
@bindable ({  name:'deletefunction', attribute:'delete-function'})
@bindable ({  name:'newfunction', attribute:'new-function'})
@bindable ({ name:'title', attribute:'title'})

export class MapList{
@bindable items = [];

constructor(){

	this.title= "";
	this.FilterEnabled = true;
	this.selectedItem = null;//{Id : 0, Key : "", Value : "" };
	this.filter= "";
	this.lastFilter ="";
	this.filteredItems = [];

	this.updatefunction = null;
	this.deletefunction = null;
	this.newfunction = null;
}

@computedFrom("selectedItem")
get isItemValid(){
	return this.selectedItem != null;
}

selectItem(item){
	this.update();
	
	if(item !== this.selectedItem){
		this.selectedItem = item;
	} else {
		this.selectedItem = null;
	}

}

set Filter(value){
	if(value !== this.filter){
		this.filter = value;
	}
}

set Items(value){
	if(value !== this.items){
		this.items = value;
	}
}

get Items(){
	if(this.filter == this.lastFilter){
		return this.filteredItems;
	}	

	this.lastFilter = this.filter;

	if(this.filter == "")
		return this.items;

	this.filteredItems = this.items.filter(this.doFilter, this);
	return this.filteredItems;
}

doFilter(item){
	let lowerFilter  = this.filter.toLowerCase();
    return item.Key.toLowerCase().includes(lowerFilter) || item.Value.toString().includes(lowerFilter);
}

clearFilter(){
	this.Filter = "";
}

delete(){
	//console.log("Deleting Map Entry: " + this.selectedItem.Id);

	if(this.selectedItem !== null && this.selectedItem.Id > 0){
	
	this.deletefunction(this.selectedItem);
	this.selectedItem = null;

	}
}

update(){
	//console.log("Updating Map Entry: " + this.selectedItem.Id);

	if(this.selectedItem !== null){
	this.updatefunction(this.selectedItem);
	}
}

new(){
	this.selectItem(this.newfunction());
}



}