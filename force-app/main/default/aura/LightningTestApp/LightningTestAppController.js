({
    handlePrev : function(component, event, helper) {
        console.log('handlePrev');
        var par = event.getParam('text');
        console.log('par 1 = '+par);
    },

    handleNext : function(component, event, helper) {
        console.log('handleNext');
        var par = event.getParam('text');
        console.log('par 2 = '+par);
    },
})