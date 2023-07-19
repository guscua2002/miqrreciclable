import React from "react";
import { useState } from "react";
import styles from "../styles/Formulario.module.css";
import FormLogin from "./FormLogin";
import FormRegister from "./Form";
import image from "../assets/image/web-pages-and-QR-code-in-the-center.png"



const MuestraForms = () => {
    const [show, setShow] = useState("true");


    return (
        <div className="min-h-screen bg-gray-50 flex">
         <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
          <div className="w-full max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Sign in</h2>
                <p className="mt-2 text-sm text-gray-600">Or&nbsp;
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">create an account</a>
                </p>
              </div>
              <div className="mt-6">
                <form className="space-y-6">
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
                      />
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
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default MuestraForms;



//<div>
//{show ? <FormRegister /> : <FormLogin />}
//</div>