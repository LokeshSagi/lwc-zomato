({
    fireAppEvent : function(component, event, helper) {
        
        console.log('1 Year Return max = '+component.find('1ys2').get('v.value'));
        
        var appEvent = $A.get('e.c:MyFundFilterEvent');
        appEvent.setParams({
            'nameString' : component.get('v.nameString'),
            'assetString' : component.find('asset').get('v.value'),
            'sectorString' : component.find('sector').get('v.value'),
            'minYTD' : component.find('ytds1').get('v.value'),
            'maxYTD' : component.find('ytds2').get('v.value'),
            'min1Y' : component.find('1ys1').get('v.value'),
            'max1Y' : component.find('1ys2').get('v.value'),
            'min5Y' : component.find('5ys1').get('v.value'),
            'max5Y' : component.find('5ys2').get('v.value'),
        });
        
        /*
        console.log('nameString === '+component.get('v.nameString'));
        console.log('assetString === '+component.find('asset').get('v.value'));
        console.log('sectorString === '+component.find('sector').get('v.value'));
*/
        appEvent.fire();
    },
    
    getPicklists : function(component, obj, field) {
        console.log('In helper doInit picklists')
        var action = component.get('c.getAssetsSectors');
        
        action.setParams({
            'objObject' : obj,
            'fld' : field
        });
        
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS') {
                var result = response.getReturnValue();
                
                console.log('Assets = '+result.assets);
                
                component.set('v.assetsLoad', result.assets);
                component.set('v.sectorsLoad', result.sectors);
            }
            else {
                
                var errors = response.getError();
                console.log(errors[0].message);
                var ev = $A.get('e.force:showToast');
                ev.setParams({
                    title : 'Error!',
                    message : 'Some error occurred.',
                    type : 'info',
                    
                });
                ev.fire();
            }
        });
        
        $A.enqueueAction(action);
    },
})