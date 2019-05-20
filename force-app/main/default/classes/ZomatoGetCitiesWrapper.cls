public class ZomatoGetCitiesWrapper {

	public List<Location_suggestions> location_suggestions {get;set;} 

	public ZomatoGetCitiesWrapper(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'location_suggestions') {
						location_suggestions = arrayOfLocation_suggestions(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'ZomatoGetCitiesWrapper consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class Location_suggestions {
		public Integer id {get;set;} 
		public String name {get;set;} 
		public Integer country_id {get;set;} 
		public String country_name {get;set;} 
		public String country_flag_url {get;set;} 
		public Integer should_experiment_with {get;set;} 
		public Integer discovery_enabled {get;set;} 
		public Integer has_new_ad_format {get;set;} 
		public Integer is_state {get;set;} 
		public Integer state_id {get;set;} 
		public String state_name {get;set;} 
		public String state_code {get;set;} 

		public Location_suggestions(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'id') {
							id = parser.getIntegerValue();
						} else if (text == 'name') {
							name = parser.getText();
						} else if (text == 'country_id') {
							country_id = parser.getIntegerValue();
						} else if (text == 'country_name') {
							country_name = parser.getText();
						} else if (text == 'country_flag_url') {
							country_flag_url = parser.getText();
						} else if (text == 'should_experiment_with') {
							should_experiment_with = parser.getIntegerValue();
						} else if (text == 'discovery_enabled') {
							discovery_enabled = parser.getIntegerValue();
						} else if (text == 'has_new_ad_format') {
							has_new_ad_format = parser.getIntegerValue();
						} else if (text == 'is_state') {
							is_state = parser.getIntegerValue();
						} else if (text == 'state_id') {
							state_id = parser.getIntegerValue();
						} else if (text == 'state_name') {
							state_name = parser.getText();
						} else if (text == 'state_code') {
							state_code = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Location_suggestions consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	public static ZomatoGetCitiesWrapper parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new ZomatoGetCitiesWrapper(parser);
	}
	
	public static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
	}
	




    private static List<Location_suggestions> arrayOfLocation_suggestions(System.JSONParser p) {
        List<Location_suggestions> res = new List<Location_suggestions>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Location_suggestions(p));
        }
        return res;
    }


}