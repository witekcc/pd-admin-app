

export class TemplateSamples{
	static Samples(){
		let samples = new Map();

		samples.set("CSV minimal", `Id, Email, Name, Location
{{range $row := .Records }}{{ $row.uuid }},{{ $row.email }},{{ $row.first_name }} {{ $row.last_name }},"{{ $row.city }}, {{if index $.Replace $row.state }}{{index $.Replace $row.state }}{{else}}{{$row.state}}{{end}}, {{ $row.zipcode }}"
{{ end }}`);

		samples.set("CSV full", `uuid,email,title,first_name,last_name,address1,address2,city,state,country,zipcode,phone1,phone2,phone3,ip,id,subMktng_id,gender,dob
{{range $row := .Records }}{{ $row.uuid}},{{ $row.email}},{{ $row.title}},{{ $row.first_name}},{{ $row.last_name}},{{ $row.address1}},{{ $row.address2}},{{ $row.city}},{{ $row.state}},{{ $row.country}},{{ $row.zipcode}},{{ $row.phone1}},{{ $row.phone2}},{{ $row.phone3}},{{ $row.ip}},{{ $row.id}},{{ $row.subMktng_id}},{{ $row.gender}},{{ $row.dob}}
{{ end }}`);

		samples.set("JSON Multiple Records", `{
 "leads": [ {{range $index, $row := .Records }}
  {{if gt $index 0}},{{end}}{"uuid":"{{ $row.uuid}}",
  "email":"{{ $row.email}}",
  "title":"{{ $row.title}}",
  "first_name":"{{ $row.first_name}}",
  "last_name":"{{ $row.last_name}}",
  "address1":"{{ $row.address1}}",
  "address2":"{{ $row.address2}}",
  "city":"{{ $row.city}}",
  "state":"{{ $row.state}}",
  "country":"{{ $row.country}}",
  "zipcode":"{{ $row.zipcode}}",
  "phone1":"{{ $row.phone1}}",
  "phone2":"{{ $row.phone2}}",
  "phone3":"{{ $row.phone3}}",
  "ip":"{{ $row.ip}}",
  "id":{{ $row.id}},
  "subMktng_id":"{{ $row.subMktng_id}}",
  "gender":"{{ $row.gender}}",
  "dob":"{{ $row.dob}}"}{{ end }}
 ]
}`);

		samples.set("JSON Single Record", `{
 "lead":{  {{$row := index .Records 0 }}
  "uuid":"{{ $row.uuid}}",
  "email":"{{ $row.email}}",
  "title":"{{ $row.title}}",
  "first_name":"{{ $row.first_name}}",
  "last_name":"{{ $row.last_name}}",
  "address1":"{{ $row.address1}}",
  "address2":"{{ $row.address2}}",
  "city":"{{ $row.city}}",
  "state":"{{ $row.state}}",
  "country":"{{ $row.country}}",
  "zipcode":"{{ $row.zipcode}}",
  "phone1":"{{ $row.phone1}}",
  "phone2":"{{ $row.phone2}}",
  "phone3":"{{ $row.phone3}}",
  "ip":"{{ $row.ip}}",
  "id":{{ $row.id}},
  "subMktng_id":"{{ $row.subMktng_id}}",
  "gender":"{{ $row.gender}}",
  "dob":"{{ $row.dob}}"}
}`);
	return samples;	
	}
}