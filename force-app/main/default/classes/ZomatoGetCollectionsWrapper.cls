public class ZomatoGetCollectionsWrapper {

	public List<Collections> collections {get;set;} 
	public Integer has_more {get;set;} 
	public String share_url {get;set;} 
	public String display_text {get;set;} 
	public Integer has_total {get;set;} 

	public ZomatoGetCollectionsWrapper(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'collections') {
						collections = arrayOfCollections(parser);
					} else if (text == 'has_more') {
						has_more = parser.getIntegerValue();
					} else if (text == 'share_url') {
						share_url = parser.getText();
					} else if (text == 'display_text') {
						display_text = parser.getText();
					} else if (text == 'has_total') {
						has_total = parser.getIntegerValue();
					} else {
						System.debug(LoggingLevel.WARN, 'ZomatoGetCollectionsWrapper consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class Collection {
		public Integer collection_id {get;set;} 
		public Integer res_count {get;set;} 
		public String image_url {get;set;} 
		public String url {get;set;} 
		public String title {get;set;} 
		public String description {get;set;} 
		public String share_url {get;set;} 

		public Collection(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'collection_id') {
							collection_id = parser.getIntegerValue();
						} else if (text == 'res_count') {
							res_count = parser.getIntegerValue();
						} else if (text == 'image_url') {
							image_url = parser.getText();
						} else if (text == 'url') {
							url = parser.getText();
						} else if (text == 'title') {
							title = parser.getText();
						} else if (text == 'description') {
							description = parser.getText();
						} else if (text == 'share_url') {
							share_url = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Collection consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	public class Collections {
		public Collection collection {get;set;} 

		public Collections(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'collection') {
							collection = new Collection(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Collections consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	public static ZomatoGetCollectionsWrapper parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new ZomatoGetCollectionsWrapper(parser);
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
	





    private static List<Collections> arrayOfCollections(System.JSONParser p) {
        List<Collections> res = new List<Collections>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Collections(p));
        }
        return res;
    }


}