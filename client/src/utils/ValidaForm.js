import * as yup from 'yup';


const emailMessage = "Por favor ingrese un correo válido";
const passwordMessage = "Password debe tener entre 5 y 10 caracteres";
const nameStoreMessage = "Nombre de la tienda debe tener entre 3 y 40 caracteres comunes";
const addressMessage = "Dirección debe tener entre 10 y 70 caracteres comunes"
const fonoMessage = "Debes ingresar un numero de telefono fijo o móvil"
const descriptionMessage = "Descripción debe tener entre 3 y 100 caracteres comunes"
const urlMessageFacebook = "Debes ingresar una dirección de facebook válida"
const urlMessageInstagram = "Debes ingresar una dirección de instagram válida"
const urelImageMessage = "Debes ingresar una Url válida"


export const userSchema = yup.object().shape({

  email: yup.string().typeError(emailMessage).matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/, { message: emailMessage }).required({ message: emailMessage }),
  password: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage })
});

export const schemaPerfilPassword = yup.object().shape({

  password: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage }),
  confirmPassword: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage })

});

export const userLoginSchema = yup.object().shape({
  email: yup.string().typeError(emailMessage).matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/, { message: emailMessage }).required({ message: emailMessage }),
  password: yup.string().typeError(passwordMessage).min(5, { message: passwordMessage }).max(10, { message: passwordMessage }).matches(/^\w/, { message: passwordMessage }).required({ message: passwordMessage })
});

export const schemaPerfilUpdate = yup.object().shape({
  fono: yup.string().typeError(fonoMessage).min(9, { message: fonoMessage }).max(9, { message: fonoMessage }).matches(/^(?!\s)[0-9]*[^$%&()/#"'!*?|a-zA-Z]*$/, { message: fonoMessage }).required({ message: fonoMessage }),
  nameStore: yup.string().typeError(nameStoreMessage).min(3, { message: nameStoreMessage }).max(40, { message: nameStoreMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: nameStoreMessage }).required({ message: nameStoreMessage }),
  address: yup.string().typeError(addressMessage).min(10, { message: addressMessage }).max(70, { message: addressMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: addressMessage }).required({ message: addressMessage }),
  description: yup.string().typeError(descriptionMessage).min(20, { message: descriptionMessage }).max(1700, { message: descriptionMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^%&()/#"'!*?|]*$/, { message: descriptionMessage }).required({ message: descriptionMessage }),

});

export const schemaPerfilUpdateWithFacebook = yup.object().shape({
  fono: yup.string().typeError(fonoMessage).min(9, { message: fonoMessage }).max(9, { message: fonoMessage }).matches(/^(?!\s)[0-9]*[^$%&()/#"'!*?|a-zA-Z]*$/, { message: fonoMessage }).required({ message: fonoMessage }),
  nameStore: yup.string().typeError(nameStoreMessage).min(3, { message: nameStoreMessage }).max(40, { message: nameStoreMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: nameStoreMessage }).required({ message: nameStoreMessage }),
  address: yup.string().typeError(addressMessage).min(10, { message: addressMessage }).max(70, { message: addressMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: addressMessage }).required({ message: addressMessage }),
  description: yup.string().typeError(descriptionMessage).min(20, { message: descriptionMessage }).max(1700, { message: descriptionMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^%&()/#"'!*?|]*$/, { message: descriptionMessage }).required({ message: descriptionMessage }),
  facebook: yup.string().typeError(urlMessageFacebook).min(8, { message: urlMessageFacebook }).max(80, { message: urlMessageFacebook }).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, { message: urlMessageFacebook }).required({ message: urlMessageFacebook }),

});

export const schemaPerfilUpdateWithInstagram = yup.object().shape({
  fono: yup.string().typeError(fonoMessage).min(9, { message: fonoMessage }).max(9, { message: fonoMessage }).matches(/^(?!\s)[0-9]*[^$%&()/#"'!*?|a-zA-Z]*$/, { message: fonoMessage }).required({ message: fonoMessage }),
  nameStore: yup.string().typeError(nameStoreMessage).min(3, { message: nameStoreMessage }).max(40, { message: nameStoreMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: nameStoreMessage }).required({ message: nameStoreMessage }),
  address: yup.string().typeError(addressMessage).min(10, { message: addressMessage }).max(70, { message: addressMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: addressMessage }).required({ message: addressMessage }),
  description: yup.string().typeError(descriptionMessage).min(20, { message: descriptionMessage }).max(1700, { message: descriptionMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^%&()/#"'!*?|]*$/, { message: descriptionMessage }).required({ message: descriptionMessage }),
  instagram: yup.string().typeError(urlMessageInstagram).min(8, { message: urlMessageInstagram }).max(80, { message: urlMessageInstagram }).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, { message: urlMessageInstagram }).required({ message: urlMessageInstagram }),

});

export const schemaPerfilUpdateWithBoth = yup.object().shape({
  fono: yup.string().typeError(fonoMessage).min(9, { message: fonoMessage }).max(9, { message: fonoMessage }).matches(/^(?!\s)[0-9]*[^$%&()/#"'!*?|a-zA-Z]*$/, { message: fonoMessage }).required({ message: fonoMessage }),
  nameStore: yup.string().typeError(nameStoreMessage).min(3, { message: nameStoreMessage }).max(40, { message: nameStoreMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: nameStoreMessage }).required({ message: nameStoreMessage }),
  address: yup.string().typeError(addressMessage).min(10, { message: addressMessage }).max(70, { message: addressMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^$%&()/#"'!*?|]*$/, { message: addressMessage }).required({ message: addressMessage }),
  description: yup.string().typeError(descriptionMessage).min(20, { message: descriptionMessage }).max(1700, { message: descriptionMessage }).matches(/^(?!\s)[a-zA-Z0-9_-]*[^%&()/#"'!*?|]*$/, { message: descriptionMessage }).required({ message: descriptionMessage }),
  facebook: yup.string().typeError(urlMessageFacebook).min(8, { message: urlMessageFacebook }).max(80, { message: urlMessageFacebook }).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, { message: urlMessageFacebook }).required({ message: urlMessageFacebook }),
  instagram: yup.string().typeError(urlMessageInstagram).min(8, { message: urlMessageInstagram }).max(80, { message: urlMessageInstagram }).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, { message: urlMessageInstagram }).required({ message: urlMessageInstagram }),

});

export const qrEsquema = yup.object().shape({
  urlredirect: yup.string().typeError(urelImageMessage).min(5, { message: urelImageMessage }).max(60, { message: urelImageMessage }).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, { message: urelImageMessage }).required({ message: urelImageMessage }),
  description1: yup
    .string()
    .typeError(descriptionMessage)
    .test('description1', 'Descripción debe tener entre 3 y 100 caracteres comunes', function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
      return /^(?!\s)[a-zA-Z0-9_-]{3,100}[^%&()/#"'!*?|]*$/.test(value);
    }),

  description2: yup
    .string()
    .typeError(descriptionMessage)
    .test('description2', 'Descripción debe tener entre 3 y 100 caracteres comunes', function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
      return /^(?!\s)[a-zA-Z0-9_-]{3,100}[^%&()/#"'!*?|]*$/.test(value);
    }),

  description3: yup
    .string()
    .typeError(descriptionMessage)
    .test('description3', 'Descripción debe tener entre 3 y 100 caracteres comunes', function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
      return /^(?!\s)[a-zA-Z0-9_-]{3,100}[^%&()/#"'!*?|]*$/.test(value);
    }),

  description4: yup
    .string()
    .typeError(descriptionMessage)
    .test('description4', 'Descripción debe tener entre 3 y 100 caracteres comunes', function (value) {
      if (!value || value.trim().length === 0) {
        return true; // No se realiza la validación si el campo está vacío
      }
      return /^(?!\s)[a-zA-Z0-9_-]{3,100}[^%&()/#"'!*?|]*$/.test(value);
    }),
})

 





