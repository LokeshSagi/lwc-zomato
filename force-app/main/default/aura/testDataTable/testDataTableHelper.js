({
	loadTable : function(component, event, helper) {
        var ld = [];
        var values1 = ['AB','BC','CD'];
        
        for(var val in values1) {
            let ob = {};
            ob.stage = values1[val];
            ld.push(ob);
        }

        component.set('v.data',ld);
	}
})