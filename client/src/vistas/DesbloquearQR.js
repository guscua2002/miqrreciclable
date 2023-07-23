import React from "react";
import { useRef, useState } from "react";
import { correctMessageActualizado } from "../utils/AlertMessages";
import HandleError from "../services/HandleError"
import { ValidatorForm } from "../services/ValidatorForm";
import { qrEsquemaUpdate } from "../utils/ValidaForm";
import { SortDate } from "../utils/SortDate";
import { updateUserQR, getOneUser } from "../services/services";
import { useEffect } from "react";
import moment from 'moment';
import { Tooltip } from 'react-tippy';
import { Link } from 'react-router-dom';
import urlImage from "../assets/image/url.png"


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
            <div className="bg-white w-full h-80vh max-w-4xl rounded-lg p-10 overflow-hidden">
                <div className="max-h-60vh overflow-y-auto"> {/* Ajustamos la altura máxima del contenido de la tabla */}
                    <div className="flex justify-between mb-4">
                        <div className="w-1/4 font-QR">
                            <label>Busqueda por URL del QR:</label>
                        </div>
                        <div className="w-3/4 flex items-center">
                            <input
                                type="text"
                                className="border border-gray-400 rounded-lg px-4 py-2 w-full"
                                placeholder="http://localhost:8000/api/qr/64a4c4341cd4303b5f66b1cd2"
                            />
                            <button className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Buscar
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-200 mx-2 md:mx-4 p-2 md:p-4 rounded shadow-md overflow-y-auto max-h-80 md:max-h-96">
                        <table className="w-full border-collapse table-fixed bg-gray-200" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}> {/* Ajustamos la tabla con una anchura fija */}
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-2 py-2 w-1/12 text-center bg-blue-500 text-white">ID</th> {/* Ajustamos el ancho del campo ID y lo centramos */}
                                    <th className="border border-gray-400 px-4 py-2 w-1/4 text-center bg-indigo-600 text-white">Creación</th>
                                    <th className="border border-gray-400 px-4 py-2 w-1/4 text-center bg-indigo-600 text-white">Enlace</th>
                                    <th className="border border-gray-400 px-4 py-2 w-1/4 text-center bg-indigo-600 text-white">Recuperar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userQr &&
                                    userQr.map((qr, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-400 px-2 py-2 w-1/6 text-center bg-blue-500 text-white">{qr.idqr}</td> {/* Ajustamos el ancho y centramos el contenido */}
                                            <td className="border border-gray-400 px-4 py-2 w-1/4 text-center">{moment(qr.datecreate).format('DD/MM/YYYY')}</td>
                                            <td className="border border-gray-400 px-4 py-2 w-1/4 text-center">
                                                <Tooltip title={qr.urlredirect} position="top">
                                                    <Link to={qr.urlredirect} target="_blank"><img src={urlImage} alt="icono de un mundo con las letras http" /></Link>
                                                </Tooltip>
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 w-1/4 text-center">Recuperar</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
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