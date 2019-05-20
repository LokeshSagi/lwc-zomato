({
	doInit : function(component, event, helper) {
		component.set('v.columns', [
            {label: 'Stage', fieldName: 'stage', type: 'text'}
        ]);
        
        helper.loadTable(component, event, helper);
	}
})