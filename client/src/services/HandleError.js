import { errorMessage, connectError } from "../utils/AlertMessages";

const HandleError = (error) => {
  let errorName = "";

    if (error.code === "ERR_NETWORK") {
    connectError();
    return;
  } else if (error.response.status === 401) {
    errorMessage(error.response.data.error);
    return;
  } else if (error.response.status === 403) {
    errorMessage(error.response.data.error);
    return;
  } else if (error.response.status === 404) {
    errorMessage(error.response.data.error);
    return;
  } else {
    if (error.response.data.error.hasOwnProperty("errors")) {
        errorName = error.response.data.error.errors;
     if (errorName.email) {
        errorMessage(errorName.email.message);
      } else if (errorName.password) {
        errorMessage(errorName.password.message);
      } else if (errorName.name) {
        errorMessage(errorName.name.message);
      } else if (errorName.urlimage) {
        errorMessage(errorName.urlimage.message);
      } else if (errorName.catchPirate) {
        errorMessage(errorName.catchPirate.message);
      }else if (errorName.confirmPassword) {
        errorMessage(errorName.confirmPassword.message);
      }
    }
  } if(error.response.data.error.hasOwnProperty("keyPattern")){
    errorMessage("Correo electrónico Ya registrado"); 
  }
};

export default HandleError;