({
    showHide : function(component) {
        var editForm = component.find("editForm");
        $A.util.toggleClass(editForm, "slds-hide");
        var viewForm = component.find("viewForm");
        $A.util.toggleClass(viewForm, "slds-hide");
    },
    handleAjaxRequest : function(component, event, helper) {
        const xhr = new XMLHttpRequest();
        
        const cep = event.getSource().get("v.value")
        
        const url = 'https://api.postmon.com.br/v1/cep/' + cep;
        
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange=function() {
            if (xhr.readyState === 4){   //if complete
                if(xhr.status === 200){  //check if "OK" (200)
                    const response = JSON.parse(this.responseText);
                                        
                    component.find("street").set("v.value", response.logradouro );
                    
                    component.find("estado").set("v.value", response.estado );
                    component.find("cidade").set("v.value", response.cidade );
                    
                    var bairro = component.get("v.neighboorField"); 
                    if(bairro != null)                
                        component.find("bairro").set("v.value", response.bairro );
                    
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Successo!",
                        "message": "CEP Encontrado",
                        "type": "success"
                    });
                    toastEvent.fire();
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Falha!",
                        "message": "CEP não encontrado",
                        "type": "error"
                    });
                    toastEvent.fire();
                }
            } 
        }
        
        
        xhr.send();
    }
})