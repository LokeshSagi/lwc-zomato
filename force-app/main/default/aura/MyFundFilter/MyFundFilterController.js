({
    
    doInit : function(component, event, helper){
        console.log('In doInit of Picklists');
        
        var obj = component.get('v.objInfo');
        var field = 'Asset_Class__c'
        helper.getPicklists(component, obj, field);
    },    
    
    nameFilterChange : function(component, event, helper) {
        helper.fireAppEvent(component, event, helper);
    },
    
    assetFilterChange : function(component, event, helper) {
        helper.fireAppEvent(component, event, helper);
    },
    
    sectorFilterChange : function(component, event, helper) {
        helper.fireAppEvent(component, event, helper);
    },
    
    onYTDminChange : function(component, event, helper) {
        var mnSlide = event.getParam('value');
        component.find('ytds2').set('v.min',mnSlide);
        
        helper.fireAppEvent(component, event, helper);
    },
    
    onYTDmaxChange : function(component, event, helper) {
        var mxSlide = event.getParam('value');
        component.find('ytds1').set('v.max', mxSlide);
        
        helper.fireAppEvent(component, event, helper);
    },
    
    on1YminChange : function(component, event, helper) {
        var mnSlide = event.getParam('value');
        component.find('1ys2').set('v.min',mnSlide);
        
        helper.fireAppEvent(component, event, helper);
    },
    
    on1YmaxChange : function(component, event, helper) {
        var mxSlide = event.getParam('value');
        component.find('1ys1').set('v.max', mxSlide);
        
        helper.fireAppEvent(component, event, helper);
    },
    
    on5YminChange : function(component, event, helper) {
        var mnSlide = event.getParam('value');
        component.find('5ys2').set('v.min',mnSlide);
        
        helper.fireAppEvent(component, event, helper);
    },
    
    on5YmaxChange : function(component, event, helper) {
        var mxSlide = event.getParam('value');
        component.find('5ys1').set('v.max', mxSlide);
        
        helper.fireAppEvent(component, event, helper);
    },
    
})