import React from "react";
import { useRef, useState } from "react";
import { correctMessageActualizado } from "../utils/AlertMessages";
import HandleError from "../services/HandleError"
import { ValidatorForm } from "../services/ValidatorForm";
import { qrEsquemaUpdate } from "../utils/ValidaForm";
import { SortDate } from "../utils/SortDate";
import { updateUserQR, getOneUser } from "../services/services";
import { useEffect } from "react";


const DesbloquearQR = ({ idUserTemp, closeModalDesbloquearQR }) => {

    let idUser = useRef(idUserTemp);
    let listUpdate = useRef("");
    const [userQr, setUserQr] = useState("");
    const [guardando, setGuardando] = useState(false);

    const search = async () => {
        try {
            const data = await getOneUser(idUser.current);
            console.log(data)
            const qrNotlocks = (data.data.user.qrcode).filter(item => item.bloqueado === true);
            const result = SortDate(qrNotlocks);
            setUserQr(result);
        } catch (error) {
            console.log(error)
            HandleError(error);
        }
    };

    useEffect(() => {
        search();
    }, []);


    const update = async () => {
        try {
            setGuardando(true);
            const data = await updateUserQR(idUser);
            const qrNotlocks = (data.data.result.qrcode).filter(item => item.bloqueado === false);
            listUpdate.current = SortDate(qrNotlocks);
            correctMessageActualizado();
            closeModalDesbloquearQR();
        } catch (error) {
            HandleError(error);
        } finally {
            setGuardando(false);
        }
    };

    const validaForm = () => {
        ValidatorForm(qrEsquemaUpdate, update);
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl h-80vh rounded-lg p-10">
            <div className="flex justify-between mb-4">
              <div className="w-1/4 font-QR">
                <label>Busqueda por URL:</label>
              </div>
              <div className="w-3/4 flex items-center">
                <input
                  type="text"
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                  placeholder="Buscar"
                />
                <button className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Buscar
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-60vh"> {/* Ajustamos la altura máxima de la tabla y permitimos el desplazamiento vertical */}
              <table className="w-full border-collapse table-fixed"> {/* Añadimos la clase table-fixed para darle un tamaño fijo a la tabla */}
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 w-1/4">ID</th> {/* Damos un tamaño fijo a cada columna */}
                    <th className="border border-gray-400 px-4 py-2 w-1/4">Creación</th>
                    <th className="border border-gray-400 px-4 py-2 w-1/4">Enlace</th>
                    <th className="border border-gray-400 px-4 py-2 w-1/4">Recuperar</th>
                  </tr>
                </thead>
                <tbody>
                  {userQr &&
                    userQr.map((qr, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-4 py-2 w-1/4">{qr.idqr}</td> {/* Damos un tamaño fijo a cada celda */}
                        <td className="border border-gray-400 px-4 py-2 w-1/4">{qr.datecreate}</td>
                        <td className="border border-gray-400 px-4 py-2 w-1/4">{qr.urlredirect}</td>
                        <td className="border border-gray-400 px-4 py-2 w-1/4">Recuperar</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="w-32 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={closeModalDesbloquearQR}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      );
}

export default DesbloquearQR;