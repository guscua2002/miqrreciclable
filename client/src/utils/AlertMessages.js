import swal from "sweetalert";

// distintos mensajes que se invocan dentro del programa

export const correctMessage = () =>{
        swal({
            title: "Qr Guardado",
            text: "Con exito",
            button: "Aceptar",
            icon: "success"
          })
          
          return;
}   

export const correctMessageActualizado = () =>{
  swal({
      title: "Qr Actualizado",
      text: "Con exito",
      button: "Aceptar",
      icon: "success"
    })
    
    return;
}   

export const searchErrorMessage = () =>{
  swal({
      title: "No hay resultados o debe ingresar fecha, fechas o descripción",
      text: "Sin éxito",
      button: "Aceptar",
      icon: "warning"
    })
    
    return;
}   

export const searchSuccess = () =>{
  swal({
      title: "Búsqueda exitosa",
      text: "éxito",
      button: "Aceptar",
      icon: "success"
    })
    
    return;
}   



export const errorMessage = (error) =>{
 
    swal({
        title: "Error en el campo",
        text:   error,
        button: "Aceptar",
        icon: "error"
      })
      
      return;
}    

export const updateMessage = () =>{

    swal({
        title: "Registro Actualizado",
        text: "éxito",
        button: "Aceptar",
        icon: "success"
      })
}

export const connectError = () =>{
    swal({
        title: "error",
        text: "Error de conexión",
        button: "Aceptar",
        icon: "warning"
      })
}

export const mensajePassword = () =>{
  swal({
      title: "error",
      text: "Password no coinciden",
      button: "Aceptar",
      icon: "warning"
    })
}

export const mensajeSuccess = () =>{
  swal({
      title: "Login exitoso",
      text: "Bienvenido",
      button: "Aceptar",
      icon: "success"
    })
}

export const updateMessagePassword = () =>{
  swal({
      title: "Cambio Password exitoso",
      text: "Deberás reingresar",
      button: "Aceptar",
      icon: "success"
    })
}

export const messageNocityOrNoRubro = () =>{
  swal({
      title: "Falta información",
      text: "Debes ingresar rubro y localidad",
      button: "Aceptar",
      icon: "warning"
    })
    
    return;
}   


export const otherDescriptionMessage = () =>{
  swal({
      title: "error en el campo",
      text: "Informacion debe tener entre 10 y 250 caracteres comunes",
      button: "Aceptar",
      icon: "warning"
    })    
    return;
}   

export const noResultMessage = () =>{
  swal({
      title: "No hay resultados",
      text: "no se encontraron coincidencias",
      button: "Aceptar",
      icon: "warning"
    })    
    return;
}   

export const updateMessageView = () =>{

  swal({
      title: "Vista y visitas Actualizadas",
      text: "éxito",
      button: "Aceptar",
      icon: "success"
    })
}

export const deleteQrMessage = () =>{

  swal({
      title: "QR eliminado exitosamente",
      text: "éxito",
      button: "Aceptar",
      icon: "success"
    })
}

export const messageExit = () =>{

  swal({
      title: "Cierre de Sesión",
      text: "exitoso, vuelve pronto",
      button: "Aceptar",
      icon: "success"
    })
}






