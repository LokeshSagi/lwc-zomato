({
    getFunds : function(component, event, helper) {
        
        //console.log('Offset:::'+component.get('v.offsetFunds'));
        
        var action = component.get('c.funds');
        action.setParams({
            "filters" : JSON.stringify(component.get('v.filterObject')),
            "offsetNum" : component.get('v.offsetFunds'),
            "fundsToDis" : component.get('v.fundsToDisplay')
        });
        
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                //console.log('Response length = '+response.getReturnValue().length);
                if(response.getReturnValue().length > 0) {
                    component.set('v.allFunds', response.getReturnValue());
                    
                }
                else {
                    component.set('v.allFunds', response.getReturnValue());
                    var ev = $A.get('e.force:showToast');
                    ev.setParams({
                        title : 'No Records!',
                        message : 'No Funds records found with the search. Please modify search criteria.',
                        type : 'info',
                        
                    });
                    ev.fire();
                }
            }
            else if(response.getState() === 'ERROR') {
                var toastParams = {
                    title : 'Error', 
                    type : 'error',
                    message : 'Unknown Error'
                }
                var errors = response.getError();
                if(errors && errors.length > 0) {
                    toastParams.message = errors[0].message;
                }
                
                var eToast = $A.get('e.force:showToast');
                eToast.setParams(toastParams);
                eToast.fire();
            }
        });
        
        $A.enqueueAction(action);
    },
    
    getCountFunds : function(component, event, helper) {
        var action = component.get('c.totalFunds');
        
        action.setParams({
            "filters" : JSON.stringify(component.get('v.filterObject'))
        });
        
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                //console.log('return value:'+response.getReturnValue());
                //console.log('return type:'+typeof response.getReturnValue());
                //console.log('return value length:'+response.getReturnValue().length);
                if(response.getReturnValue() !== 0) {
                    //console.log('In 1st = '+response.getReturnValue());
                    
                    if(response.getReturnValue() <= 9) {
                        component.set('v.currentPage',1);
                        component.set('v.totalFunds', response.getReturnValue());
                        component.set('v.totalPages', ( Math.ceil(response.getReturnValue() / component.get('v.fundsToDisplay')) ) );
                    }
                    else {
                        component.set('v.totalFunds', response.getReturnValue());
                        component.set('v.totalPages', ( Math.ceil(response.getReturnValue() / component.get('v.fundsToDisplay')) ) );
                    }
                    
                }
                else {
                    //alert('Inside total count fun');
                    //console.log('In 2nd = '+response.getReturnValue());
                    component.set('v.totalFunds', response.getReturnValue());
                    component.set('v.totalPages', 1);
                    //console.log('TotalPages = '+component.get('v.totalPages'));
                    component.set('v.currentPage',1);
                    //console.log('currentPage = '+component.get('v.currentPage'));
                    /*
                    var ev = $A.get('e.force:showToast');
                    ev.setParams({
                        title : 'No Records!',
                        message : 'No Funds records found with the search. Please modify search criteria.',
                        type : 'info',
                        
                    });
                    ev.fire(); */
                }
            }
            else if(response.getState() === 'ERROR') {
                var toastParams = {
                    title : 'Error', 
                    type : 'error',
                    message : 'Unknown Error'
                }
                var errors = response.getError();
                if(errors && errors.length > 0) {
                    toastParams.message = errors[0].message;
                }
                
                var eToast = $A.get('e.force:showToast');
                eToast.setParams(toastParams);
                eToast.fire();
            }
        });
        $A.enqueueAction(action);
    },
})