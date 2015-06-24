

export class Services{

	static LeadGen(){
		return "http://localhost:9001/";
	}

	static LeadConfig(){
		return "http://localhost:9002/";
	}

	static LeadSend(){
		return "http://localhost:9007/";
	}

	static CampaignResolver(){
		return "http://localhost:9004/";
	}

	static CampaignBuckets(){
		return "http://10.0.1.203:7000/buckets/?type=age";
		//return "http://localhost:7000/buckets/1/";
	}

}