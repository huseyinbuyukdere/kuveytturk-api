import * as Helper from './apiHelper'
import * as Config from './config';
import * as UtilsHelper from './utils';

var CLIENT_ID = '';
var CLIENT_SECRET = '';
var REDIRECT_URI = '';
var PRIVATE_KEY = '';

export default class kuveytturkApi {

    constructor(client_id, client_secret, redirect_uri, private_key) {
        CLIENT_ID = client_id;
        CLIENT_SECRET = client_secret;
        REDIRECT_URI = redirect_uri;
        PRIVATE_KEY = private_key;        
    }

    getCredentialsToken() {
        if(Helper.isValidToken(this.token))
        {
            return new Promise((resolve) => { resolve(this.token.access_token)})
        }
        var scopeList = [];
        scopeList.push('public');
        var request = Helper.getClientCredentialsRequest(scopeList, CLIENT_ID, CLIENT_SECRET);
        return new Promise((resolve, reject) => {
            var fetchBody = Helper.getFetch(request);
            fetch(Config.CLIENT_CREDENTIALS_URL, fetchBody).
                then((response) => {
                    if (response.status != 200) {
                        reject(response.statusText);
                    }
                    else
                    {
                        response.json().then((data) => {
                            this.token = {};
                            this.token.access_token = data.access_token;
                            this.token.expiresIn= data.expires_in
                            this.token.receivedTime = Date.now();
                            resolve(data.access_token);
                        })
                    }

                })
        })
    }

    getAuthorizationToken(code)
    {
        var request ={}
        if(this.authorizedToken && this.authorizedToken.code == code)
        {
            if( Helper.isValidToken(this.authorizedToken))
            {
                return new Promise((resolve) => { resolve(this.authorizedToken.access_token)})
            }

            request = Helper.getRefreshTokenRequest(this.authorizedToken.refresh_token,CLIENT_ID,CLIENT_SECRET);

        }
        else
        {
            request = Helper.getAuthorizationCodeRequest(code,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
        }


        return new Promise((resolve, reject) => {
            var fetchBody = Helper.getFetch(request);
            fetch(Config.AUTHORIZATIN_FLOW_URL, fetchBody).
                then((response) => {
                    if (response.status != 200) {
                        reject(response.statusText);
                    }
                    else
                    {
                        response.json().then((data) => {
                            this.authorizedToken = {};
                            this.authorizedToken.access_token = data.access_token;
                            this.authorizedToken.code= code;
                            this.authorizedToken.expiresIn= data.expires_in
                            this.authorizedToken.receivedTime = Date.now();
                            this.authorizedToken.refresh_token = data.refresh_token;
                            resolve(data.access_token);
                        })
                    }

                })
        })
    }

    fxCurrencyList() {
        return this.sendGeneralGetRequest(Config.FX_CURRENCY_LIST);
    }

    fxCurrencyRates() {
       return this.sendGeneralGetRequest(Config.FX_CURRENCY_RATES);
    }

    kuveytTurkBranchList()
    {
        return this.sendGeneralGetRequest(Config.KUVEYT_TURK_BRANCHES);
    }

    kuveytTurkAtmList()
    {
        return this.sendGeneralGetRequest(Config.KUVEYT_TURK_ATMS);
    }
    
    kuveytTurkXtmList()
    {
        return this.sendGeneralGetRequest(Config.KUVEYT_TURK_XTMS);
    }

    bankList()
    {
        return this.sendGeneralGetRequest(Config.BANK_LIST);
    }

    bankBranchList(bankId, cityId)
    {
        var apiUrl = Config.BANK_LIST + '/'+bankId+'/branches';
        var query = '?cityId='+cityId;
        var fullUrl = apiUrl + query;
        return this.sendGeneralGetRequest(fullUrl,query);
    }

    sendGeneralGetRequest(url,query)
    { 
        return new Promise((resolve, reject) => {
            this.getCredentialsToken().then((token) =>
            {
                var body;
                var request = Helper.getGeneralRequest(token,body,PRIVATE_KEY,query);
                var fetchBody = Helper.getFetch(request);
                fetch(url, fetchBody).
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

    getAuthorizationUrl(scopeList,state)
    {
        var params = {};
        params.client_id = CLIENT_ID;
        params.response_type ='code',
        params.redirect_uri = REDIRECT_URI;
        params.state = state;     
        params.scope = UtilsHelper.arrayToString(scopeList);       
        var fullUrl = UtilsHelper.addParamsToUrl(params, Config.AUTHORIZATION_URL);
        return fullUrl;        
    }
}
