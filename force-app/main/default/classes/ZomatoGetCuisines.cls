public with sharing class ZomatoGetCuisines {
    
    @AuraEnabled(cacheable=true)
    public static String zomatoGetCuisines(String cids){
        system.debug('cid = '+cids);
        try {
            String resBody;
            if(!String.isBlank(String.valueOf(cids))) {
                String url = 'https://developers.zomato.com/api/v2.1/cuisines';
                url += '?city_id=';
                String encoded = EncodingUtil.urlEncode(cids, 'UTF-8');
                url += encoded;
                system.debug('url = '+url);
                Http http = new Http();
                HttpRequest req = new HttpRequest();
                req.setMethod('GET');
                req.setHeader('content-type','application/json');
                req.setEndpoint(url);
                req.setTimeout(120000);
				req.setHeader('user-key', 'f03ec2f5a05efc5efff39fd43b3ffb20');
                HttpResponse res = http.send(req);

                resBody = res.getBody();
                system.debug('Response = '+resBody);    

                return resBody;
            }
            else {
                 return resBody;
            }
        } 
        catch (Exception e) {
            system.debug('Message = '+e.getMessage());
            system.debug('Line = '+e.getLineNumber());
            throw new AuraHandledException('exceptionText'+e.getMessage());
        } 
    }
}