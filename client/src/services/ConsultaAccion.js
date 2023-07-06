import swal from "sweetalert";

export const ConsultaAccion = (handler,title,text) =>{  
    swal({
      title:  title,
      text: text,
      icon: "warning",
      buttons: ["No","Si"],
    }).then(respuesta =>{
       if(respuesta){
        handler();      
       }
    })
  }