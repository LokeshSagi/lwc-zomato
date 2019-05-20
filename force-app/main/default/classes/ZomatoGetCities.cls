public with sharing class ZomatoGetCities {
    
    @AuraEnabled(cacheable=true)
    public static String getCities(String city) {
        try {
            system.debug('city = '+city);
            ZomatoGetCitiesWrapper wraps;
            String resBody;
            if(!String.isBlank(city)) {
                String url = 'https://developers.zomato.com/api/v2.1/cities';
                url += '?q=';
                String encoded = EncodingUtil.urlEncode(city, 'UTF-8');
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
                
                wraps = ZomatoGetCitiesWrapper.parse(resBody);
                system.debug('wraps = '+wraps);
                for(ZomatoGetCitiesWrapper.Location_suggestions loc : wraps.location_suggestions) {
                    system.debug('Loc = '+loc);
                }
                return resBody;
            }
            
            else return resBody;
        }
        Catch(Exception e) {
            system.debug('Message = '+e.getMessage());
            system.debug('Line = '+e.getLineNumber());
            throw new AuraHandledException(e.getMessage());
        }
    }
}