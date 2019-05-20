({
    doInit : function(component, event, helper) {
        var filterObject = {
            nameString: '',
            assetString: '',
            sectorString: '',
            minYtdReturn: -30,
            maxYtdReturn: 30,    
            min1YearReturn: -30, 
            max1YearReturn: 30,    
            min5YearReturn: -30,    
            max5YearReturn: 30  
        }
        component.set("v.filterObject", filterObject);
        
        //console.log('filterObject = '+Object.entries(component.get("v.filterObject")));
                
        helper.getCountFunds(component, event, helper); 
        helper.getFunds(component, event, helper);
        
    },
    
    onRightClick : function(component, event, helper) {
        component.set('v.offsetFunds', ( component.get('v.offsetFunds') + component.get('v.fundsToDisplay') ));
        component.set('v.currentPage', component.get('v.currentPage')+1 );
        helper.getFunds(component, event, helper);
    },
    
    onLeftClick : function(component, event, helper) {
        component.set('v.offsetFunds', ( component.get('v.offsetFunds') - component.get('v.fundsToDisplay') ));
        component.set('v.currentPage', component.get('v.currentPage')-1 );
        helper.getFunds(component, event, helper);
    },
    
    onMouseMove : function(component, event, helper) {
        /* var cTar = event.currentTarget;
        var tar = event.target;
        
        var allfunds = component.get("v.allFunds");
        
        //console.log('cTar='+cTar);
        //console.log('tar='+tar);
        console.log('Fund='+tar.dataset.id);
        var selFund = allfunds[tar.dataset.id];     
        console.log(selFund);
        var showPop = component.find('popOver').enablePopFromParent(allfunds[tar.dataset.id]); */
        
        
        var tags = [];
        var tar = event.target;
        var cTar = event.currentTarget;
        if(tar === cTar) {return};
        var allFunds = component.get("v.allFunds");
        var attributes = {"fund" : allFunds[tar.dataset.id]};
        
        //console.log('Hovered Fund ======== '+attributes.fund.Id);
        
        $A.createComponent('c:MyFundTilePopOver', attributes, function(newComp, status, errorMessage) {
            if(status === 'SUCCESS') {
                //console.log('Index == '+allFunds[tar.dataset.id].Name);
                component.find('overlayLib').showCustomPopover({
                    body : newComp,
                    referenceSelector : '.'+allFunds[tar.dataset.id].Id,
                    cssClass: "slds-popover,slds-nubbin_left,no-pointer,popoverclass,cMyFundTileList"
                }).then(function(overLay) {
                    var popOverList = component.get('v.popoverInstance');
                    popOverList.push(overLay);
                    component.set('v.popoverInstance', popOverList); 
                    
                    tags.push(tar.tagName);
                    //console.log('Tag === '+tags);
                })
            }
            else{
                console.log('error: ' + errorMessage);
            }
        })
        
    },
    
    onMouseLeave : function(component, event, helper) {
        //console.log('Leaft Fund = '+component.get('v.simpleRecord.Name'))
        //
        
        //component.find("popOver").hidePopup();
        var popoverList = component.get('v.popoverInstance');
        
        //console.log('list ===== '+popoverList)
        if(popoverList != null){
            for(var index in popoverList){ // close all popovers in array
                var popover = popoverList[index];
                if(popover != null){
                    popover.close();
                }
            }
            // console.log('popoverInstance === '+popoverList);
            
        }   
    },
    
    loadFilterFunds : function(component, event, helper) {
        /*console.log('nameString === '+event.getParam('nameString'));
        console.log('assetString === '+event.getParam('assetString'));
        console.log('sectorString === '+event.getParam('sectorString')); */
        
        component.set('v.offsetFunds', 0);
        component.set('v.currentPage', 1);
        
        var filterObject = component.get("v.filterObject");
        
        if( (event.getParam('nameString') !== undefined) && ((event.getParam('nameString') !== null)) ) {
            filterObject.nameString = event.getParam('nameString');
        }
        
        if( (event.getParam('assetString') !== undefined) && ((event.getParam('assetString') !== null)) ) {
            filterObject.assetString = event.getParam('assetString');
        }
        
        if( (event.getParam('sectorString') !== undefined) && ((event.getParam('sectorString') !== null)) ) {
            filterObject.sectorString = event.getParam('sectorString');
        }
        
        filterObject.minYtdReturn = event.getParam('minYTD');
        filterObject.maxYtdReturn = event.getParam('maxYTD');
        filterObject.min1YearReturn = event.getParam('min1Y');
        filterObject.max1YearReturn = event.getParam('max1Y');
        filterObject.min5YearReturn = event.getParam('min5Y');
        filterObject.max5YearReturn = event.getParam('max5Y');
        
        
        component.set('v.filterObject', filterObject);
        helper.getCountFunds(component, event, helper); 
        helper.getFunds(component, event, helper);
    },
    
})