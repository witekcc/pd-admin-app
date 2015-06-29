import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Services} from 'services';
 
 @inject(HttpClient)
export class DemographicRanking {
	constructor(http){
    this.client = new HttpClient()
      .configure(x =>{
            x.withBaseUrl(Services.CampaignBuckets());
            x.withHeader('Content-Type', 'application/json');
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

  Reload(){
    for (var i = this.BucketTypes.length - 1; i >= 0; i--) {
      this.GetBuckets(this.BucketTypes[i]);
    }
 }

	GetBuckets(bucketType) {
		this.client.get(`/buckets/?type=${bucketType}`)
      .then(httpResponse => {
        if (httpResponse.isSuccess){
          let buckets = JSON.parse(httpResponse.response);
          this.Buckets[bucketType] = buckets.map(bucket => {
            return {
              name: bucket.BucketName,
              type: bucket.DemographicType,
              bucket: bucket.Bucket,
              weight: bucket.BucketWeight,
              id: bucket.ID,
            };
          });
        }
		})
    .catch(e => {
      //TODO do something with errors
      console.dir(e);
    });
	}

  UpdateBucket(bucket, fn) {
    console.dir(bucket);
    this.client.put(`/buckets/${bucket.id}/`, bucket)
      .then(httpResponse => {
        this.Reload();
        fn(bucket.id, httpResponse.isSuccess, null);
    })
    .catch(e => {
      fn(null, null, e);
    });
  }

  CreateBucket(newBucket, fn) {
    this.client.post(`/buckets/`, newBucket)
      .then(httpResponse => {
        this.Reload();
        fn('bucketID', httpResponse.isSuccess, null);
    })
    .catch(e => {
      fn(null, null, e);
    });
  }


  DeleteBucket(bucketID, fn) {
    this.client.delete(`/buckets/${bucketID}/`)
      .then(httpResponse => {
        this.Reload();
        fn(bucketID, httpResponse.isSuccess, null);
    })
    .catch(e => {
      fn(null, null, e);
    });
  }
}
