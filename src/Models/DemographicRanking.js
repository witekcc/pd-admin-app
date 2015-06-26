import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Services} from 'services';
 
 @inject(HttpClient)
export class DemographicRanking {
	constructor(http){
    this.client = new HttpClient()
      .configure(x =>{
            //x.withHeader('Content-Type', 'application/json');
            x.withBaseUrl(Services.CampaignBuckets())
      });

      this.BucketTypes = [
        'age',
        'gender',
        'email',
        'region'
      ] ;

      this.Buckets={};

      for (var i = this.BucketTypes.length - 1; i >= 0; i--) {
        this.Buckets[this.BucketTypes[i]] = [];
      }

      this.Reload();
	}

  get foo(){
    console.log("getting it");
  }

  Reload(){
    for (var i = this.BucketTypes.length - 1; i >= 0; i--) {
      this.GetBuckets(this.BucketTypes[i]);
    }
 }

	GetBuckets(bucketType) {
		this.client.get(`/buckets/?type=${bucketType}`)
      .then(httpResponse => {
        if (httpResponse.isSuccess){
          this.Buckets[bucketType] = JSON.parse(httpResponse.response);
        }
		})
    .catch(e => {
      //TODO do something with errors
      console.dir(e);
    });
	}

    UpdateBucket(bucket) {
    console.dir(bucket)
    this.client.put(`/buckets/${bucket.ID}/`, bucket)
      .then(httpResponse => {
        if (httpResponse.isSuccess){
          console.log("Updated");
        }
        
    })
    .catch(e => {
      //TODO do something with errors
      console.dir(e);
    });
  }

  CreateBucket(newBucket) {
    console.dir(newBucket)
    this.client.post(`/buckets/`, newBucket)
      .then(httpResponse => {
        if (httpResponse.isSuccess){
          console.log("Created");
        }
        
    })
    .catch(e => {
      //TODO do something with errors
      console.dir(e);
    });
  }


    DeleteBucket(bucketID, cb) {
    this.client.delete(`/buckets/${bucketID}/`)
      .then(httpResponse => {
        
        if (httpResponse.isSuccess){
          console.log("Delete");
        }
        cb(bucketID, httpResponse.isSuccess, null)
    })
    .catch(e => {
      cb(null, null, e)
      //TODO do something with errors
      console.dir(e);
    });
  }
}
