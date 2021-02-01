({
    editRecord : function(component, event, helper) {
        helper.showHide(component);
    },handleChange : function(component, event, helper) {        
        if(event.getSource().get("v.value").length == 8)
        {
            helper.handleAjaxRequest(component, event, helper);        
        }
        
    },handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Successo!",
            "message": "O endereço foi atualizado",
            "type": "success"
        });
        toastEvent.fire();
        var recUpdate = $A.get("e.c:recordUpdated");
        recUpdate.fire();
        helper.showHide(component);
    },
    handleCancel : function(component, event, helper) {
        helper.showHide(component);
        event.preventDefault();
    }
})