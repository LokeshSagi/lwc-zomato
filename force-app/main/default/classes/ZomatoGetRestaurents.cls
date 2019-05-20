public with sharing class ZomatoGetRestaurents {
    
    @AuraEnabled(cacheable=true)
    public static string zomatoAllRests(String filters){
        system.debug('Filter = '+filters);
        try {
            String resBody;
            if(!String.isBlank(filters)) {
                Filter fill = (Filter) JSON.deserializeStrict(filters, Filter.class);
                String url = 'https://developers.zomato.com/api/v2.1/search';
                if(fill.cityId != null || fill.colId != null || fill.estId != null || fill.type != null || fill.offset != null) {
                    url += '?';
                    if (fill.cityId != null) {
                        url += 'entity_id=' + fill.cityId;
                    }
                    if (fill.type != null) {
                        url += '&entity_type=' + fill.type;
                    }
                    if(fill.offset != null) {
                        url += '&start=' + fill.offset;
                    }
                    if (fill.estId != null) {
                        url += '&establishment_type=' + fill.estId;
                    }
                    if(fill.colId != null) {
                        url += '&collection_id=' + fill.colId;
                    }
                    if(fill.count != null) {
                        url += '&count=' + fill.count;
                    }
                }
                
                
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
            
        } catch (Exception e) {
            System.debug('Error Message = '+e.getMessage());
            System.debug('Error Line = '+e.getLineNumber());
            throw new AuraHandledException('Aura Exception'+e.getMessage());
        }
        
    }

    public class Filter {
        public String cityId;
        public String type;
        public String estId;
        public String colId;
        public Integer offset;
        public Integer count;
    }
}