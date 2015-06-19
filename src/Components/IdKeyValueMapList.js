import {IdKeyValueCollection} from 'Models/IdKeyValueCollection';
import {computedFrom, bindable} from 'aurelia-framework';

@bindable ({ name:'title', attribute:'title'})
@bindable ({ name:'collection', attribute:'source-items', changeHandler:'collectionChanged'})
@bindable ({ name:'filterenabled', attribute:'filterenabled'})

export class IdKeyValueMapList{
constructor(){

	this.title= "";
	this.filterenabled = true;
	this.filter= "";
	this.lastFilter ="";
	this.filteredItems = null;

}

stopTheBubble(event){
	event.stopPropagation();
}

collectionChanged(newValue, oldValue){
	this.Filter = "";
	if(newValue != null)
		this.filteredItems = newValue.items;

}

get selectedItem() {
	if(this.IsValid)
		return this.collection.selectedItem;
	else 
		return null;
}


selectItem(item){
	this.collection.SelectItem(item);
}

get IsValid(){
	return this.collection != null;
}

set Filter(value){
		this.filter = value;
		this.filterItems();
}

get Filter(){
	return this.filter;
}

filterItems(){
	if(this.IsValid)
	{
		if(this.filterenabled) {
			this.filteredItems = this.collection.items.filter(this.filterPredicate, this);
		}
		else
		{
			this.filteredItems = this.collection.items;
		}
	}
}

filterPredicate(item){
	let lowerFilter  = this.filter.toLowerCase();
    return item.Key.toLowerCase().includes(lowerFilter) || item.Value.toLowerCase().includes(lowerFilter);
}

clearFilter(){
	this.Filter = "";
}

delete(){
	this.collection.Delete();
	this.filterItems();
}

update(){
	this.collection.Update();
	this.selectItem(null);
	this.filterItems();
}


new(){	
	this.collection.New();
	this.clearFilter();	
}



}