import React from "react";
import { useRef, useState } from "react";
import { correctMessageDesbloqueado } from "../utils/AlertMessages";
import HandleError from "../services/HandleError"
import { SortDate } from "../utils/SortDate";
import { getOneUser } from "../services/services";
import { useEffect } from "react";
import moment from 'moment';
import { Tooltip } from 'react-tippy';
import { Link } from 'react-router-dom';
import urlImage from "../assets/image/url.png"
import unlockImage from "../assets/image/lock.png"
import { deleteUserQR } from "../services/services";
import { searchSuccess, searchErrorMessageRecovery } from "../utils/AlertMessages";


const DesbloquearQR = ({ idUserTemp, closeModalDesbloquearQR, handleUpdateList }) => {

    let idUser = useRef(idUserTemp);
    let listUpdate = useRef("");
    const [userQr, setUserQr] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [buscador, setBuscador] = useState("");

    const search = async () => {
        try {
            const data = await getOneUser(idUser.current);
            const qrNotlocks = (data.data.user.qrcode).filter(item => item.bloqueado === true);
            const result = SortDate(qrNotlocks);
            setUserQr(result);
        } catch (error) {
            HandleError(error);
        }
    };

    useEffect(() => {
        search();
    }, []);

    const recuperar = async (idqr) => {
        try {
            setGuardando(true);
            const data = await deleteUserQR(idUser.current, { idqr });
            const qrLocks = (data.data.result.qrcode).filter(item => item.bloqueado === true);
            const resultLocks = SortDate(qrLocks);
            const qrNotLocks = (data.data.result.qrcode).filter(item => item.bloqueado === false);
            listUpdate.current = SortDate(qrNotLocks);
            handleUpdateList(listUpdate.current);
            correctMessageDesbloqueado();
            setUserQr(resultLocks);
        } catch (error) {
            HandleError(error);
        } finally {
            setGuardando(false);
        }
    }

    const buscarQR = () => {
        if (buscador.length >= 54) {
            const idQr = buscador.substring(53, buscador.length)
            const result = userQr.filter(item => item.idqr === Number(idQr))
              if (result.length > 0) {
                setUserQr(result)
                searchSuccess();
            } else {
                searchErrorMessageRecovery();
            }
        } else {
            searchErrorMessageRecovery();
        }
    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full h-80vh max-w-4xl rounded-lg p-10 overflow-hidden">
            <div className="max-h-60vh overflow-y-auto">
              {/* Ajustamos la altura máxima del contenido de la tabla */}
              <div className="flex justify-between mb-4">
                <div className="w-1/4" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>
                  <label>Busqueda por URL del QR:</label>
                </div>
                <div className="w-3/4 flex items-center">
                  <input
                    onChange={(e) => setBuscador(e.target.value)}
                    type="text"
                    className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                    placeholder="http://18.224.62.70/api/qr/64a4c4341cd4303b5f66b1cd2"
                    value={buscador}
                  />
                  <button onClick={() => buscarQR()} className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Buscar
                  </button>
                </div>
              </div>
              <div className="bg-gray-200 mx-2 md:mx-4 p-2 md:p-4 rounded shadow-md overflow-y-auto max-h-80 md:max-h-96">
                <table className="w-full border-collapse table-fixed bg-gray-200" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>
                  {/* Ajustamos la tabla con una anchura fija */}
                  <thead>
                    <tr>
                      <th className="border border-gray-400 px-2 py-2 w-1/12 text-center bg-blue-500 text-white">ID</th>
                      {/* Ajustamos el ancho del campo ID y lo centramos */}
                      <th className="border border-gray-400 px-4 py-2 w-1/4 text-center bg-indigo-600 text-white">Creación</th>
                      <th className="border border-gray-400 px-4 py-2 w-1/4 text-center bg-indigo-600 text-white">Enlace</th>
                      <th className="border border-gray-400 px-4 py-2 w-1/4 text-center bg-indigo-600 text-white">Desbloquear</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userQr &&
                      userQr.map((qr, index) => (
                        <tr key={index} className="hover:bg-gray-300 cursor-pointer">
                          <td className="border-b border-gray-400 px-2 py-2 w-1/6 text-center bg-blue-500 text-white">{qr.idqr}</td>
                          {/* Ajustamos el ancho y centramos el contenido */}
                          <td className="border-b border-gray-400 px-4 py-2 w-1/4 text-center">{moment(qr.datecreate).format('DD/MM/YYYY')}</td>
                          <td className="border-b border-gray-400 px-4 py-2 w-1/4 text-center">
                            <div className="flex justify-center items-center">
                              {/* Alineamos horizontal y verticalmente */}
                              <Tooltip title={qr.urlredirect} position="top">
                                <Link to={qr.urlredirect} target="_blank">
                                  <img src={urlImage} alt="icono de un mundo con las letras http" />
                                </Link>
                              </Tooltip>
                            </div>
                          </td>
                          <td className="border-b border-gray-400" >
                            <div className="flex justify-center items-center">
                              {/* Alineamos horizontal y verticalmente */}
                              <img src={unlockImage}
                                onClick={() => recuperar(qr.idqr)}
                                alt="icono de un candado abierto amarillo"
                                className="cursor-pointer" />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="w-32 px-6 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-600"
                onClick={closeModalDesbloquearQR}
              >
                Cerrar
              </button>
            </div>
            {guardando && (
              <label>Desbloqueando...</label>
            )}
          </div>
        </div>
      );
}

export default DesbloquearQR;