
import { arrayToString, JSON_to_URLEncoded, generateSignature , getSecondsBetweenDates } from './utils';
import { URL_ENCODED_TYPE} from './constants';

export function getClientCredentialsRequest(scopeList, clientId, secretId) {
    var request = {
        body: '',
        headers: {}
    };
    var body = {};
    body.grant_type = "client_credentials";
    body.scope = arrayToString(scopeList);
    body.client_id = clientId;
    body.client_secret = secretId;
    request.headers = Object.assign({}, request.headers , {'Content-Type': URL_ENCODED_TYPE})
    request.body = JSON_to_URLEncoded(body);
    return request;
}

export function getAuthorizationCodeRequest(code,clientId, secretId, redirectUri) {
    var request = {
        body: '',
        headers: {}
    };
    var body = {};
    body.grant_type = "authorization_code";
    body.client_id = clientId;
    body.client_secret = secretId;
    body.redirect_uri = redirectUri;
    body.code = code;
    request.headers = Object.assign({}, request.headers , {'Content-Type': URL_ENCODED_TYPE})
    request.body = JSON_to_URLEncoded(body);
    return request;
}

export function getRefreshTokenRequest(refreshToken,clientId,secretId) {
    var request = {
        body: '',
        headers: {}
    };
    var body = {};
    body.grant_type = "refresh_token";
    body.refresh_token = refreshToken;
    body.client_id = clientId;
    body.client_secret = secretId;
    request.headers = Object.assign({}, request.headers , {'Content-Type': URL_ENCODED_TYPE})
    request.body = JSON_to_URLEncoded(body);
    return request;
}




export function getGeneralRequest(token,body,privateKey,query)
{
    var request = {
        body : '',
        headers: {}
    };
    request.body = "";
    if(body)
    {
        request.body = JSON.stringify(body);
    }
    request.headers.Authorization = 'Bearer '+token;
    request.headers.Signature = generateSignature(token,request.body,privateKey,query);    
    request.headers = Object.assign({}, request.headers, {
        'Content-Type' : 'application/json'
    })

    return request;
}

export function getFetch(request) {
    if (request.body) {

         return {
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: request.body, // Coordinate the body type with 'Content-Type'
            headers: request.headers
         };
    }
    else {
        return {
            method: 'GET', // 'GET', 'PUT', 'DELETE', etc.            
            headers: request.headers,
          };
    }
}

export function getGeneralGetRequest(privateKey,url,getCredentialsToken)
{
    new Promise((resolve, reject) => {
        getCredentialsToken().then((token) =>
        {
            var body;
            var request = getGeneralRequest(token,body,privateKey);
            var fetchBody = getFetch(request);
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

export function isValidToken(token)
{
    if(!token)
    {
        return false;
    }
    var now = Date.now();
    if(getSecondsBetweenDates(now,token.receivedTime)<token.expiresIn)
    {
        return true;
    }
}