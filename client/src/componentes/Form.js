import React from "react";
import { useState } from "react";
import styles from "../styles/Formulario.module.css";
import {
  correctRegister,
  mensajePassword,
} from "../utils/AlertMessages";
import { ValidatorForm } from "../services/ValidatorForm";
import { userRegister } from "../services/services";
import { userSchema } from "../utils/ValidaForm";
import HandleError from "../services/HandleError";

const FormRegister = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const userInfo = {
    email,
    password,
    confirmPassword,
  };

  const validaForm = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      ValidatorForm(userSchema, userInfo, onSubmitHandler);
    } else {
      mensajePassword();
    }
  };

  const onSubmitHandler = async () => {
    try {

      const data = await userRegister(userInfo);
      console.log(data)
      correctRegister();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error)
      HandleError(error)
    }
  }

      return (

        <form onSubmit={validaForm} className={styles.formulario}>
          <div>
            <label htmlFor="campo1">Correo electrónico:</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="mitiendita@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="campo2">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="campo3">Repetir Contraseña:</label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.containerSubmit}>
            <button type="submit" className={styles.btn}>Registrarse</button>{' '}
          </div>
        </form>

      );
    };

    export default FormRegister;
