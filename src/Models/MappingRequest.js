

export class MappingRequest {
	
	constructor(){
		this.Templates = [];
		this.ReplacementMap = null;
		this.Limit = 0;;
	}


	addTemplate(template){
		this.Templates.push(template);
	}

	setReplacementMap(replacements){

		if(replacements.length > 0)
		{
			this.ReplacementMap = replacements;
		}	
	}
}
		