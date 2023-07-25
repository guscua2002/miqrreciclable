const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Correo ya se encuentra registrado'],
    required: [true, 'Por favor ingrese un correo válido'],
    match: [/^(?!\s)[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/, 'Por favor ingrese un correo válido'],
  },
  password: {
    type: String,
    required: [true, 'Password debe tener entre 5 y 10 caracteres'],
    minlength: [5, 'Password debe tener entre 5 y 10 caracteres'],
    maxlength: [10, 'Password debe tener entre 5 y 10 caracteres'],
  },
  qrcode: [{
    idqr: {
      type: Number,
      default: 0
    },
    urlredirect: {
      type: String,
      required: [true, 'Debes ingresar una Url válida'],
      minlength: [5,'Debes ingresar una Url válida'],
      maxlength: [1000,'Debes ingresar una Url válida'],
      match: [/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,'Debes ingresar una Url válida'],           
    },
    qrstring: {
      type: String,
      required: true
    },
    description1: {
      type: String,
      minlength: [3,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      maxlength: [100,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      match: [/^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/,'Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también'],
    },
    description2: {
      type: String,
      minlength: [3,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      maxlength: [100,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      match: [/^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/,'Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también'],
    },
    description3: {
      type: String,
      minlength: [3,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      maxlength: [100,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      match: [/^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/,'Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también'],
    },
    description4: {
      type: String,
      minlength: [3,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      maxlength: [100,'Descripción debe tener entre 3 y 100 caracteres comunes'],
      match: [/^(?!\s)[a-zA-Z0-9-\s]{3,100}(?![%&()/#"'!*?|])$/,'Descripción debe tener entre 3 y 100 caracteres comunes, puedes usar el guión medio también'],
    },
    counter: {
      type: Number,
      default: 0
    },
    datecreate: {
      type: Date,
      default: Date.now
    },
    bloqueado: {
      type: Boolean,
      default: false
    }
  }]
}, { timestamps: true }
);

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Contraseñas deben coincidir')
  }
  next();
});

UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      })
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
