
import  * as crypto from 'crypto'

export function arrayToString(list)
{

    var result ='';
    if(list)
    {
        list.forEach(item => {
            result += item + ' ';
        });
        result = result.substr(0, result.length-1);
    }
    return result;
}

export function JSON_to_URLEncoded(element,key,list){
    list = list || [];
    if(typeof(element)=='object'){
      for (var idx in element)
        JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
    } else {
      list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
}

export function generateSignature(token,body,privateKey,query){

    var encryptedText = token+body;
    if(query)
    {
        encryptedText += query;
    }
    var sign = crypto.createSign('RSA-SHA256');
    sign.write(encryptedText);
    sign.end();
    var signature = sign.sign(privateKey, 'base64');
    return signature;

}

export function getSecondsBetweenDates(date1,date2)
{
    if(date1>date2)
    {
        return (date1-date2)/1000;
    }

    return (date2-date1)/1000;
}

export function addParamsToUrl(paramObject,url)
{
    let resultUrl = '';
    if(url)
    {
        resultUrl = url;
        if(paramObject)
        {
            resultUrl += '?';
            Object.keys(paramObject).forEach( key => {
                if(paramObject[key])
                {
                    resultUrl+=key+'='+paramObject[key];
                    resultUrl+='&';
                }
            });
            resultUrl = resultUrl.substr(0, resultUrl.length-1);            
        }     
    }    
    return resultUrl;

}