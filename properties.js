define(['jquery','underscore','qlik','ng!$q'], function ($, _, qlik, $q) {

	return {
		type: "items",
		component: "accordion",
		items: {
			settings: {
				uses: "settings",
			}
		}	
	}
});

	//Defines settings to be used in properties
	/*
	var settingsDefinition = {
		
		uses: 'settings',
		type: "items",
		items: {
			fieldSelection: {
				label: 'Field Selection',
				type: 'items',
				items: {               
					list: {
						type: "string",
						component: "dropdown",
						label: "Field",
						ref: "field",
						options: function () {
							return getFieldList().then(function (items) {
								//sort field list 
								return items.sort(compare);
							});
						},
						defaultValue: ''
					},
					isCaseSensitive: {
						type: "boolean",
						component: "checkbox",
						label: "Case Sensitive?",
						ref: "isCaseSensitive",
						defaultValue: false
					}
				}
			}
		}
	};
	
	return {
       		type: "items",
	       	component: "accordion", 
	        items: {
				settings: settingsDefinition 
	        }
	}

});
*/