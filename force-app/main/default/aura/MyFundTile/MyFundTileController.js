({
    onTileClick : function(component, event, helper) {

        var navEvent = $A.get("e.force:navigateToSObject");
        if(navEvent) {
            //alert('Tile clicked = '+component.get('v.simpleRecord.Id'))
            //window.open('/'+ component.get('v.simpleRecord').Id);
            navEvent.setParams({
                "recordId" : component.get('v.simpleRecord.Id')
            });
            navEvent.fire();
        } 
    },
    
    /*
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
        
  /*      
        var tar = event.target;
        var cTar = event.currentTarget;
        if(tar === cTar) {
            return
        }
        var attributes = {"fund" : component.get('v.simpleRecord')};
        
        console.log('Hovered Fund ======== '+attributes.fund.Id);
        $A.createComponent('c:MyFundTilePopOver', attributes, function(newComp, status, errorMessage) {
            if(status === 'SUCCESS') {
                component.find('overlayLib').showCustomPopover({
                    body : newComp,
                    referenceSelector : component.get('v.index'),
                    cssClass: "slds-popover,slds-nubbin_left-top,no-pointer,cMyFundTile"
                }).then(function(overLay) {
                    var popOverList = component.get('v.popoverInstance');
                    popOverList.push(overLay);
                    component.set('v.popoverInstance', popOverList);
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
            if(popoverList != null){
                for(var index in popoverList){ // close all popovers in array
                    var popover = popoverList[index];
                    if(popover != null){
                        popover.close();
                    }
                }
            }

    },
    
    */

})