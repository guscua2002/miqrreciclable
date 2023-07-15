import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';
import "../vistas/login.css"
import HandleError from '../services/HandleError';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/;

    if (!regex.test(email)) {
      setErrores({ email: 'No es un correo electrónico válido' });
      return false;
    }
    if (email === "") {
      setErrores({ email: 'El correo no puede estar vacío' });
      return;
    }
    if (password === "" ) {
      setErrores({ password: 'No debe estar vacio, mayor a 5 y menor a 10 ' });
      return;
    }
    axios.post('http://localhost:8000/api/user/login', {
      email, password}, { withCredentials: true }
    )
      .then((res) => {
        
        const id = res.data.user._id;
        const email = res.data.user.email;

        console.log(id,email)
        navigate('/home', { state: { id, email } });

        // Mostrar la alerta SweetAlert2
           swal({
            title: "Inicio de sesión exitoso",
            text: "Bienvenido!",
            button: "Aceptar",
            icon: "success"  
        });
      }).catch((error) => {
         HandleError(error);
      })

  }
  return (
    <div className='content'>
        <h1 className='title'>My Dynamic QR</h1>
    <div className='row justify-content-center'>      
      <div className='p-3 col-4 col-4 bg mt-5'>
        <span className='user' >
          <i className="fa fa-user-circle"></i>
          <h3 className='titulo'> Inicio de Sesion</h3>
        </span>
        <form className='mx-auto p-3 shadow border' onSubmit={submitHandler}>
          <div className='input-group mb-4'>
            <span className="input-group-text" id="basic-addon1"> <i className="fa fa-envelope"></i></span>
            <input type="text" className='form-control' placeholder="Ingrese el Correo" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='bg-danger  text-center error ' >
            <p> {errors.email ? <span className='text-white'> {errors.email.message}</span> : null}</p>
            {errores.email && (<p className="text-white ">{errores.email}</p>)}
          </div>
          <div className='input-group mb-4'>
            <span className="input-group-text" id="basic-addon1"> <i className="fa fa-lock"></i></span>
            <input type="password" className='form-control' placeholder="Ingrese Contraseña" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='bg-danger  text-center error ' >
          {errores.password && (<p className="text-white ">{errores.password}</p>)}
          </div>
          <span>
            <button type="submit" className="btn btn-outline-secondary buttonLogin mt-3">Iniciar Sesión</button>
          </span>
        </form>      
      </div>
    </div>
    </div>
  )
}

export default Login;
