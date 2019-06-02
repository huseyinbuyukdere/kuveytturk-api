
Javascript Library for the Kuveyt Turk API!
------------

This library provides a Javascript interface for the [Kuveyt Turk API](https://developer.kuveytturk.com.tr/#/). Making a request to Kuveyt Turk API requires a valid access token and signature. OAuth procedures are eased and signature generation is automated in this library.
Installation
------------
Get the latest version with npm

    npm install kuveytturk-api

Usage
------------
You need to get a instance from KuveytturkApi object with the your application credentials.

    import { KuveytturkApi } from 'kuveytturk-api'
    //...
        this.kuveytturkApi = new KuveytturkApi(
        CLIENT_ID,
        SECRET_ID,
        REDIRECT_URL,
        PRIVATE_KEY);       
    //...
  
  Then , you can call Api Products below.  
  **Only Api Products which has client credentials authorization flow can be call directly.**

    //...
        this.kuveytturkApi.kuveytTurkBranchList().then( (data) => {
			console.log(data);
		}).catch( (error) =>{
			console.log(error);
		});     
    //...

 - Information Services
	 - FX Currency List
	 - FX Currency Rates
	 - Kuveyt Turk Branch List
	 - Kuveyt Turk ATM List
	 - Kuveyt Turk XTM List
	 - Bank List
	 - Bank Branch List

Getting Help
---

Please, ask a question on [Stack Overflow](https://stackoverflow.com) and tag it with [kuveytturk](https://stackoverflow.com/questions/tagged/kuveytturk)
