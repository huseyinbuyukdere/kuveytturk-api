import * as Helper from './apiHelper'
import * as Config from './config';

var CLIENT_ID = '';
var CLIENT_SECRET = '';
//var REDIRECT_URI = '';
var PRIVATE_KEY = '';

export default class kuveytturkApi {

    constructor(client_id, client_secret, redirect_uri, private_key) {
        CLIENT_ID = client_id;
        CLIENT_SECRET = client_secret;
       // REDIRECT_URI = redirect_uri;
        PRIVATE_KEY = private_key;        
    }

    getCredentialsToken() {
        if(Helper.isValidToken(this.token))
        {
            return new Promise((resolve) => { resolve(this.token.access_token)})
        }
        var scopeList = [];
        scopeList.push('public');
        var request = Helper.prepareClientCredentialsRequest(scopeList, CLIENT_ID, CLIENT_SECRET);
        return new Promise((resolve, reject) => {
            var fetchBody = Helper.prepareFetch(request);
            fetch(Config.CLIENT_CREDENTIALS_URL, fetchBody).
                then((response) => {
                    if (response.status != 200) {
                        reject(response.statusText);
                    }
                    response.json().then((data) => {
                        this.token = {};
                        this.token.access_token = data.access_token;
                        this.token.expiresIn= data.expires_in
                        this.token.receivedTime = Date.now();
                        resolve(data.access_token);
                    })
                })
        })
    }

    fxCurrencyList() {
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.prepareGeneralRequest(token,body,PRIVATE_KEY);
                var fetchBody = Helper.prepareFetch(request);
                fetch(Config.FX_CURRENCY_LIST, fetchBody).
                    then((response) => {
                        if (response.status != 200) {
                            reject(response.statusText);
                        }
                        response.json().then((data) => {
                            resolve(data);
                        })
                    })
            })
        })
    }

    fxCurrencyRates() {
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.prepareGeneralRequest(token,body,PRIVATE_KEY);
                var fetchBody = Helper.prepareFetch(request);
                fetch(Config.FX_CURRENCY_RATES, fetchBody).
                    then((response) => {
                        if (response.status != 200) {
                            reject(response.statusText);
                        }
                        response.json().then((data) => {
                            resolve(data);
                        })
                    })
            })
        })
    }

    kuveytTurkBranchList()
    {
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.prepareGeneralRequest(token,body,PRIVATE_KEY);
                var fetchBody = Helper.prepareFetch(request);
                fetch(Config.KUVEYT_TURK_BRANCHES, fetchBody).
                    then((response) => {
                        if (response.status != 200) {
                            reject(response.statusText);
                        }
                        response.json().then((data) => {
                            resolve(data);
                        })
                    })
            })
        })
    }

    kuveytTurkAtmList()
    {
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.prepareGeneralRequest(token,body,PRIVATE_KEY);
                var fetchBody = Helper.prepareFetch(request);
                fetch(Config.KUVEYT_TURK_ATMS, fetchBody).
                    then((response) => {
                        if (response.status != 200) {
                            reject(response.statusText);
                        }
                        response.json().then((data) => {
                            resolve(data);
                        })
                    })
            })
        })
    }
    
    kuveytTurkXtmList()
    {
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.prepareGeneralRequest(token,body,PRIVATE_KEY);
                var fetchBody = Helper.prepareFetch(request);
                fetch(Config.KUVEYT_TURK_XTMS, fetchBody).
                    then((response) => {
                        if (response.status != 200) {
                            reject(response.statusText);
                        }
                        response.json().then((data) => {
                            resolve(data);
                        })
                    })
            })
        })
    }

    bankList()
    {
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.prepareGeneralRequest(token,body,PRIVATE_KEY);
                var fetchBody = Helper.prepareFetch(request);
                fetch(Config.BANK_LIST, fetchBody).
                    then((response) => {
                        if (response.status != 200) {
                            reject(response.statusText);
                        }
                        response.json().then((data) => {
                            resolve(data);
                        })
                    })
            })
        })
    }

    bankBranchList(bankId, cityId)
    {
        var apiUrl = Config.BANK_LIST + '/'+bankId+'/branches';
        var query = '?cityId='+cityId;
        var fullUrl = apiUrl + query;
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.prepareGeneralRequest(token,body,PRIVATE_KEY,query);
                var fetchBody = Helper.prepareFetch(request);
                fetch(fullUrl, fetchBody).
                    then((response) => {
                        if (response.status != 200) {
                            reject(response.statusText);
                        }
                        response.json().then((data) => {
                            resolve(data);
                        })
                    })
            })
        })
    }
}
