import * as yup from 'yup';


const emailMessage = "Por favor ingrese un correo válido";
const passwordMessage = "Password debe tener entre 5 y 10 caracteres";
const noQrString = "Debe esperar a que se genere codigo QR, esquina superior derecha";
const descriptionMessage = "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también"
const urelImageMessage = "Debes ingresar una Url válida"


export const userSchema = yup.object().shape({

  email: yup.string().typeError(emailMessage).matches(/^(?!\s)[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/
  , { message: emailMessage }).required({ message: emailMessage }),
  password: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage })
});

export const schemaPerfilPassword = yup.object().shape({

  password: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage }),
  confirmPassword: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage })

});

export const userLoginSchema = yup.object().shape({
  email: yup.string().typeError(emailMessage).matches(/^(?!\s)[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/
  , { message: emailMessage }).required({ message: emailMessage }),
  password: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage })
});


export const qrEsquema = yup.object().shape({
  urlredirect: yup.string().typeError(urelImageMessage).min(5, { message: urelImageMessage }).max(1000, { message: urelImageMessage }).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, { message: urelImageMessage }).required({ message: urelImageMessage }),
  qrstring: yup.string().typeError(noQrString).required({ message: noQrString }),                                                                                                                         
  description1: yup
    .string()
    .typeError(descriptionMessage)
    .test('description1', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
      return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value);       
    }),

  description2: yup
    .string()
    .typeError(descriptionMessage)
    .test('description2', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
      return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value);    
    }),

  description3: yup
    .string()
    .typeError(descriptionMessage)
    .test('description3', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
     return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value);
    }),

  description4: yup
    .string()
    .typeError(descriptionMessage)
    .test('description4', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
     return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value);
    }),
})

export const qrEsquemaUpdate = yup.object().shape({
  urlredirect: yup.string().typeError(urelImageMessage).min(5, { message: urelImageMessage }).max(1000, { message: urelImageMessage }).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, { message: urelImageMessage }).required({ message: urelImageMessage }),
  description1: yup
    .string()
    .typeError(descriptionMessage)
    .test('description1', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
     return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value); 
    }),

  description2: yup
    .string()
    .typeError(descriptionMessage)
    .test('description2', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
     return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value);
    }),

  description3: yup
    .string()
    .typeError(descriptionMessage)
    .test('description3', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
     return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value);
    }),

  description4: yup
    .string()
    .typeError(descriptionMessage)
    .test('description4', "Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también", function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
     return /^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/.test(value);
    }),
})

 





