({
    /*
    onEnablePop : function(component, event, helper) {
        //console.log('Enabled PopOver');
        var args = event.getParam('arguments');
        if(args != null) {
            console.log('Id='+args.fun.Id);
            component.set('v.fund', args.fun);
            
            var pop = component.find("popup");
            
            $A.util.removeClass(pop, "slds-hidden");
        }
        
    },
    
    hidePop : function(component, event, helper) {
        var pop = component.find("popup");
        $A.util.addClass(pop, "slds-hidden");
    },
    */
    
    doInit : function(component, event, helper) {
        console.log('COntroller');
    }
    
})