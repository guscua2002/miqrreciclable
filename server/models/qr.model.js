const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Correo ya se encuentra registrado'],
    required: [true, 'Por favor ingrese un correo válido'],
    match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/, 'Por favor ingrese un correo válido'],
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
      required: true
    },
    qrstring: {
      type: String,
      required: true
    },
    description1: {
      type: String
    },
    description2: {
      type: String
    },
    description3: {
      type: String
    },
    description4: {
      type: String
    },
    counter: {
      type: Number,
      default: 0
    },
    datecreate: {
      type: Date,
      default: Date.now
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
