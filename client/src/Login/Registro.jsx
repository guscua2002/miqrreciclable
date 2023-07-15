import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import "../vistas/registro.css";
import HandleError from '../services/HandleError';


const Registro = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errores, setErrores] = useState({})

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/;

    if (!regex.test(email)) {
      setErrores({ email: 'No es un correo electrónico válido' });
      return false;
    }

    if (email === "") {
      setErrores({ email: 'El correo  no puede estar vacío ' });
      return;
    }
    if (password === "") {
      setErrores({ password: 'No debe estar vacio' });
      return;
    } else {
      if (password.length < 5 || password.length > 10) {
        setErrores({ password: ' debe de ser mayor a 5 y menor a 10 ' });
        return;
      }
    }

    if (password !== confirmPassword) {
      setErrores({ confirmPassword: 'Las contraseñas no coinciden' });
      return;
    }
    axios.post('http://localhost:8000/api/user/register', {
      email, password, confirmPassword,
    }, { withCredentials: true })
      .then((res) => {
        console.log(res)
        swal({
            title: "Se ha registrado exitosamente",
            text: "Con exito",
            button: "Aceptar",
            icon: "success"      

        }).then(() => {
          navigate('/login');
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
        <Link to={`/login`} className=' ' > Iniciar Sesión </Link>
        <span className='user' >
          <i className="fa fa-user-circle"></i>
          <h3 className='titulo'> Registro de Usuario</h3>
        </span>
        <form className='  mx-auto p-3 shadow border' onSubmit={submitHandler} >

          <div className='input-group mb-4'>
            <span className="input-group-text" id="basic-addon1"> <i class="fa fa-envelope"></i></span>
            <input type="email" className='form-control ' placeholder="Ingrese el Correo" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='bg-danger  text-center error ' >
            {errores.email && (<p className="text-white ">{errores.email}</p>)}
          </div>

          <div className='input-group mb-4'>
            <span className="input-group-text" id="basic-addon1"> <i class="fa fa-lock"></i></span>
            <input type="password" className='form-control' placeholder="Ingrese Contraseña" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='bg-danger  text-center error ' >
            {errores.password && (<p className="text-white ">{errores.password}</p>)}
          </div>
          <div className='input-group mb-5'>
            <span className="input-group-text" id="basic-addon1"> <i class="fa fa-lock"></i></span>
            <input type='password' className='form-control ' placeholder="Confirmar Contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {errores.confirmPassword && (<p className="text-black ">{errores.confirmPassword}</p>)}

          <span className=''>
            <button type="submit" class="btn btn-outline-secondary text-dark botnRegistrar mb-2">Registrar</button>
            <button type="button" class="btn btn-outline-secondary botnRegistrar"> <Link to={`/`} className=' text-dark text-decoration-none ' > Conoce sobre este Servicio </Link></button>
          </span>
        </form>
      </div >
    </div >
   </div>
  )
}

export default Registro;
