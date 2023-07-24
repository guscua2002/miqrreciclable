import React, { useState } from "react";
import { userLoginSchema } from "../utils/ValidaForm";
import { ValidatorForm } from "../services/ValidatorForm";
import { userLogin } from "../services/services";
import HandleError from "../services/HandleError";
import { mensajeSuccess } from "../utils/AlertMessages";
import { useNavigate } from "react-router-dom";
import image from "../assets/image/web-pages-and-QR-code-in-the-center.png"
import logo from "../assets/image/logo.svg"

import { Link } from 'react-router-dom';


const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();


  const userInfo = {
    email,
    password,
  };

  const validaForm = (e) => {
    e.preventDefault();

    ValidatorForm(userLoginSchema, userInfo, onSubmitHandler);
  };

  const onSubmitHandler = async () => {
    try {
      const data = await userLogin(userInfo);
      console.log(data)
      const id = data.data.user._id;
      const email = data.data.user.email;
      navigate('/home', { state: { id, email } });
      mensajeSuccess()
    } catch (error) {
      HandleError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="w-full max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">Or&nbsp;
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">create an account </Link>
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={validaForm} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    placeholder="micomercio@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)} />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <div className="flex flex-col items-center mt-6">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
                <img src={logo} alt="dibujo flechas en ambos sentidos de colores" className="w-48 h-48 mt-4" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
