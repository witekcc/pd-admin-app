

export class MappingRequest {
	
	constructor(){
		this.Templates = [];
		this.ReplacementMap = new Map();
		this.Limit = 0;;
	}


	addTemplate(template){
		this.Templates.push(template);
	}

	setReplacementMap(array){
		this.ReplacementMap.clear()
		for (entry in array){
			this.ReplacementMap.set(entry.Key, entry.Value);
		}
	}
}
		