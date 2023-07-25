import React, { useState, useRef, useEffect } from "react";
import Creador from "../componentes/Creador";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getOneUser, deleteUserQR, userLogout } from "../services/services";
import HandleError from "../services/HandleError";
import imageDelete from "../assets/image/delete.png"
import qrCode from "../assets/image/qr-code.png"
import imageRefresh from "../assets/image/refresh.png"
import urlImage from "../assets/image/url.png"
import moment from 'moment';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SortDate } from "../utils/SortDate";
import { updateMessageView, deleteQrMessage, searchErrorMessage, messageExit, searchSuccess } from "../utils/AlertMessages";
import Actualizador from "./Actualizador";
import { ConsultaAccion } from "../utils/ConsultaAccion";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'; // Importa los estilos CSS de react-tippy
import DesbloquearQR from "../vistas/DesbloquearQR";



function Home() {

    const location = useLocation();

    const idUser = useRef(location.state.id);
    const correo = useRef(location.state.email);
    const navigate = useNavigate();


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUnlockQR, setIsOpenUnlockQR] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const [userQr, setUserQr] = useState("");
    const [updateView, setUpdateView] = useState(false);
    const [isOpenActualizador, setIsOpenActualizador] = useState(false);
    const [searchDescription, setSearchDescription] = useState("");
    const [isFijado, setIsFijado] = useState(false)
    const [checkFijar, setCheckFijar] = useState(false);
    let urlredirect = useRef("");
    let description1 = useRef("");
    let description2 = useRef("");
    let description3 = useRef("");
    let description4 = useRef("");
    let datecreate = useRef("");
    let idqr = useRef(0);
    let qrstring = useRef("");
    let counter = useRef(0);
    const text1 = "Bloqueo de Qr"
    const text2 = "Estas seguro de Bloquear QR?"
    let filter = useRef("");

    const closeModal = () => {
        setIsOpen(false);
    };

    const closeModalActualizador = () => {
        setIsOpenActualizador(false);
    };

    const closeModalDesbloquearQR = () => {
        setIsOpenUnlockQR(false);
    };


    const search = async () => {
        try {
            const data = await getOneUser(idUser.current);
            const qrNotlocks = (data.data.user.qrcode).filter(item => item.bloqueado === false);
            const result = SortDate(qrNotlocks);
            setUserQr(result);
            if (updateView === true) {
                setCheckFijar(false);
                updateMessageView();
                actualizarVariables();
            }
            setUpdateView(false);
        } catch (error) {
            HandleError(error);
        }
    };

    useEffect(() => {
        search();
    }, []);

    useEffect(() => {
        if (updateView === true) {
            search();
        }
    }, [updateView]);

    const showQrcode = (codigoQR) => {
        const svgBlob = new Blob([codigoQR], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        Swal.fire({
            imageUrl: svgUrl,
            imageAlt: 'A tall image',
            customClass: {
                image: 'w-80 h-auto',
            },
            footer: '<button id="customButton" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Descargar</button>',
            didOpen: () => {
                const customButton = Swal.getPopup().querySelector('#customButton');
                customButton.addEventListener('click', () => downloadSVG(codigoQR));
            },
        });
    }

    const downloadSVG = (codigoQR) => {
        const qrContainer = document.createElement("div");
        qrContainer.innerHTML = codigoQR;

        const qrSvg = qrContainer.querySelector("svg");
        qrSvg.setAttribute("width", "400");
        qrSvg.setAttribute("height", "400");

        const svgString = qrContainer.innerHTML;
        const file = new Blob([svgString], { type: "image/svg+xml" });

        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "codigoQR.svg";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleUpdateList = (listUpdate) => {
        setUserQr(listUpdate);
        setCheckFijar(false);
        actualizarVariables();        
    };

    const updateModalContent = (url, descr1, descr2, descr3, descr4, date, idq, stringQR, counterTemp) => {
        urlredirect.current = url;
        description1.current = descr1;
        description2.current = descr2;
        description3.current = descr3;
        description4.current = descr4;
        datecreate.current = date;
        idqr.current = idq;
        qrstring.current = stringQR;
        counter.current = counterTemp;
        setIsOpenActualizador(true);
    }

    const handlerDeleteQR = (id) => {
        idqr.current = id;
        ConsultaAccion(eliminarQR, text1, text2);
    }

    const eliminarQR = async () => {

        try {
            const data = await deleteUserQR(idUser.current, { idqr: idqr.current });
            if (isFijado === false) {
                const qrNotlocks = (data.data.result.qrcode).filter(item => item.bloqueado === false);
                const result = SortDate(qrNotlocks);
                setUserQr(result);
                setCheckFijar(false);
            }
            deleteQrMessage();
            actualizarVariables();
        } catch (error) {
            HandleError(error);
        }
    }

    const filtrar = () => {

        if (selectedDate !== null && selectedDate2 === null && searchDescription === "") {

            filter.current = userQr.filter(item => moment(item.datecreate).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY'));

        } else if (selectedDate !== null && selectedDate2 !== null && searchDescription === "") {

            filter.current = userQr.filter(item => moment(item.datecreate).format('DD/MM/YYYY') >= moment(selectedDate).format('DD/MM/YYYY')
                && moment(item.datecreate).format('DD/MM/YYYY') <= moment(selectedDate2).format('DD/MM/YYYY'));


        } else if (selectedDate !== null && selectedDate2 !== null && searchDescription.length > 0) {

            const filterDescription = userQr.filter(item => moment(item.datecreate).format('DD/MM/YYYY') >= moment(selectedDate).format('DD/MM/YYYY')
                && moment(item.datecreate).format('DD/MM/YYYY') <= moment(selectedDate2).format('DD/MM/YYYY'));

            filter.current = filterDescription.filter(item => {
                const palabraFiltrar = searchDescription.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar1 = item.description1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar2 = item.description2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar3 = item.description3.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar4 = item.description4.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar5 = item.urlredirect.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                    palabraComparar1.includes(palabraFiltrar) ||
                    palabraComparar2.includes(palabraFiltrar) ||
                    palabraComparar3.includes(palabraFiltrar) ||
                    palabraComparar4.includes(palabraFiltrar) ||
                    palabraComparar5.includes(palabraFiltrar)
                );
            })

        } else if (selectedDate !== null && selectedDate2 === null && searchDescription.length > 0) {

            const filterDescription = userQr.filter(item => moment(item.datecreate).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY'));

            filter.current = filterDescription.filter(item => {
                const palabraFiltrar = searchDescription.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar1 = item.description1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar2 = item.description2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar3 = item.description3.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar4 = item.description4.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar5 = item.urlredirect.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                    palabraComparar1.includes(palabraFiltrar) ||
                    palabraComparar2.includes(palabraFiltrar) ||
                    palabraComparar3.includes(palabraFiltrar) ||
                    palabraComparar4.includes(palabraFiltrar) ||
                    palabraComparar5.includes(palabraFiltrar)
                );
            })

        } else if (selectedDate === null && selectedDate2 === null && searchDescription.length > 0) {

            filter.current = userQr.filter(item => {
                const palabraFiltrar = searchDescription.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar1 = item.description1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar2 = item.description2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar3 = item.description3.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar4 = item.description4.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar5 = item.urlredirect.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                    palabraComparar1.includes(palabraFiltrar) ||
                    palabraComparar2.includes(palabraFiltrar) ||
                    palabraComparar3.includes(palabraFiltrar) ||
                    palabraComparar4.includes(palabraFiltrar) ||
                    palabraComparar5.includes(palabraFiltrar)
                );
            })
        } else if (selectedDate === null && selectedDate2 === null && searchDescription.length === 0) {
            searchErrorMessage();
        }

        if (filter.current.length > 0) {
            setUserQr(SortDate(filter.current));
            searchSuccess();
            setCheckFijar(true);
            filter.current = "";
        } else {
            searchErrorMessage();
        }
    }

    const actualizarVariables = () => {
        setSearchDescription("");
        setSelectedDate(null);
        setSelectedDate2(null);
        filter.current = "";
        return;
    }

    const logout = async () => {
        try {
            const data = await userLogout({ email: correo.current });
            messageExit();
            navigate("/")
        } catch (error) {
            HandleError(error);
        }
    }


    return (
        <div className="bg-white min-h-screen min-w-full max-w-full">
            <header className="bg-indigo-600 text-white font-bold">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h1 className="ml-2 md:ml-4 font-QR text-base md:text-lg font-QR" style={{ fontFamily: "'QR', sans-serif" }}>
                        QR Reciclable Manager
                    </h1>
                    <div className="ml-2 md:ml-6 font-sans text-xs md:text-base">
                        Tu solución inteligente para administrar y potenciar tus códigos QR.
                    </div>
                    <button onClick={logout} className="ml-auto mr-2 md:mr-4 py-2 px-4 bg-indigo-800 hover:bg-indigo-600 rounded text-xs md:text-base" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>
                        Cerrar Sesión
                    </button>
                </div>
            </header>
            <main>
                <div className="bg-gray-200 py-4 md:py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col md:flex-row items-center mb-2 md:mb-0">
                        <a data-tooltip-id="my-tooltip" data-tooltip-content="Filtrar por fecha o rangos de fechas">
                            <p className="mr-2 md:mr-4 text-gray-900 text-xs md:text-base" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>Filtrar por fecha(s):</p>
                        </a>
                        <div className="flex">
                            <div className="mr-2 flex justify-center">
                                <DatePicker
                                    className="w-24 md:w-32 text-center bg-indigo-600 rounded-full text-white" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}
                                    selected={selectedDate}
                                    onChange={date => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="flex justify-center">
                                <DatePicker
                                    className="w-24 md:w-32 text-center bg-indigo-600 rounded-full text-white" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}
                                    selected={selectedDate2}
                                    onChange={date => setSelectedDate2(date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center mb-2 md:mb-0">
                        <p className="mr-2 md:mr-4 text-gray-900 text-xs md:text-base" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>Por enlace o descripción:</p>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="mr-2 bg-indigo-700 rounded-full p-1 flex items-center justify-center w-7 h-7">
                                    <span className="text-white">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Buscar palabra en campos enlace o descripción">
                                    <input
                                        onChange={(e) => setSearchDescription(e.target.value)}
                                        type="text"
                                        value={searchDescription}
                                        className="w-58 md:w-60 text-xs md:text-base border border-gray-300 rounded px-2 py-1"
                                        style={{ outline: 'none' }}
                                        placeholder="www.misitio.com"
                                    />
                                </a>
                            </div>
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Aplica el filtrado por fecha, por enlace o descripción">
                                {isFijado ? (<button className="ml-2 py-2 px-2 md:px-4 bg-gray-500 cursor-not-allowed rounded text-xs md:text-base text-white" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>Filtrar</button>
                                ) : (<button onClick={() => filtrar()} className="ml-2 py-2 px-2 md:px-4 bg-blue-500 rounded text-xs md:text-base text-white" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>Filtrar</button>)}
                            </a>
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Carga formulario para crear codigo QR">
                                {isFijado ? (<button className="ml-2 py-2 px-2 md:px-3 bg-gray-500 cursor-not-allowed rounded text-xs md:text-base text-white" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>Crear QR</button>
                                ) : (<button onClick={() => setIsOpen(true)} className="ml-2 py-2 px-2 md:px-3 bg-green-500 rounded text-xs md:text-base text-white" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>Crear QR</button>)}
                            </a>
                            {isOpen && (
                                <Creador closeModal={closeModal} idUser={idUser.current} handleUpdateList={handleUpdateList} />
                            )}
                            {isOpenActualizador && (
                                <Actualizador idUserTemp={idUser.current} urlredirectTemp={urlredirect.current} description1Temp={description1.current}
                                    description2Temp={description2.current} description3Temp={description3.current} description4Temp={description4.current}
                                    datecreateTemp={datecreate.current} idqrTemp={idqr.current} qrstringTemp={qrstring.current} counterTemp={counter.current} closeModalActualizador={closeModalActualizador} handleUpdateList={handleUpdateList} isFijado={isFijado} />
                            )}
                            {isOpenUnlockQR && (
                                <DesbloquearQR idUserTemp={idUser.current} closeModalDesbloquearQR={closeModalDesbloquearQR} handleUpdateList={handleUpdateList} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end my-2 md:my-4 mr-2 md:mr-8">
                    <div className="flex space-x-2">
                        {/* Barra de menú */}
                        <a data-tooltip-id="my-tooltip" data-tooltip-content="Si fijas y editas o bloqueas QR, deberás Desfijar y Recargar todos, para ver los cambios">
                            <label className="flex items-center space-x-1">
                                {checkFijar ? (<input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                    onChange={(e) => setIsFijado(e.target.checked)}
                                // Agrega aquí la lógica para manejar el estado del checkbox
                                />) : (
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"
                                        onChange={(e) => setIsFijado(e.target.checked)}
                                        disabled
                                    // Agrega aquí la lógica para manejar el estado del checkbox
                                    />)}
                                <span className="text-gray-900 text-xs md:text-base">Fijar celdas Filtradas (opcional)</span>
                            </label>
                        </a>
                        <a data-tooltip-id="my-tooltip" data-tooltip-content="Recupera QR Bloqueados">
                            {isFijado ? (<button
                                className="py-2 px-3 md:px-4 bg-gray-500 cursor-not-allowed rounded text-xs md:text-base text-white"
                            >
                                Recuperar QR
                            </button>) : (
                                <button
                                    onClick={() => setIsOpenUnlockQR(true)}
                                    className="py-2 px-3 md:px-4 bg-green-500 rounded text-xs md:text-base text-white"
                                >
                                    Recuperar QR
                                </button>)}
                        </a>
                        <a data-tooltip-id="my-tooltip" data-tooltip-content="Recarga registros y actualiza visitas">
                            {isFijado ? (<button
                                className="py-2 px-3 md:px-4 bg-gray-500 cursor-not-allowed rounded text-xs md:text-base text-white"
                            >
                                Recargar todos
                            </button>) : (
                                <button
                                    onClick={() => setUpdateView(true)} // Reemplaza "setUpdateView" con la función correspondiente
                                    className="py-2 px-3 md:px-4 bg-blue-500 rounded text-xs md:text-base text-white"
                                >
                                    Recargar todos
                                </button>)}
                        </a>
                    </div>
                </div>
                <div className="bg-gray-200 mx-2 md:mx-4 p-2 md:p-4 rounded shadow-md overflow-y-auto max-h-80 md:max-h-96">
                    <table className="w-full bg-gray-200 text-xs md:text-base" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300 bg-blue-500 text-white">ID</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-indigo-600 text-white">Creación</th>
                                <th className="py-2 px-4 border-b border-gray-300 bg-indigo-600 text-white">Enlace</th>
                                <th className="py-2 px-4 text-left border-b border-gray-300 bg-indigo-600 text-white">Descripción</th>
                                <th className="py-2 px-4 text-left border-b border-gray-300 bg-indigo-600 text-white">Descripción</th>
                                <th className="py-2 px-4 text-left border-b border-gray-300 bg-indigo-600 text-white">Descripción</th>
                                <th className="py-2 px-4 text-left border-b border-gray-300 bg-indigo-600 text-white">Descripción</th>
                                <th className="py-2 px-4 text-center border-b border-gray-300 bg-indigo-600 text-white">Visitas</th>
                                <th className="py-2 px-4 text-center border-b border-gray-300 bg-indigo-600 text-white">Editar</th>
                                <th className="py-2 px-4 text-center border-b border-gray-300 bg-indigo-600 text-white">Bloquear</th>
                                <th className="py-2 px-4 text-center border-b border-gray-300 bg-indigo-600 text-white">Visualizar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userQr && userQr.map((qr, index) => (
                                <tr key={index} className="hover:bg-gray-300 cursor-pointer">
                                    <td className="py-2 px-4 border-b border-gray-300 bg-blue-500 text-white">{qr.idqr}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{moment(qr.datecreate).format('DD/MM/YYYY')}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <Tooltip title={qr.urlredirect} position="top">
                                            <Link to={qr.urlredirect} target="_blank"><img src={urlImage} alt="icono de un mundo con las letras http" /></Link>
                                        </Tooltip>
                                    </td>
                                    <td className="py-2 px-4 text-left border-b border-gray-300">{qr.description1}</td>
                                    <td className="py-2 px-4 text-left border-b border-gray-300">{qr.description2}</td>
                                    <td className="py-2 px-4 text-left border-b border-gray-300">{qr.description3}</td>
                                    <td className="py-2 px-4 text-left border-b border-gray-300">{qr.description4}</td>
                                    <td className="py-2 px-4 text-center border-b border-gray-300">{qr.counter}</td>
                                    <td className="py-2 px-4 text-center border-b border-gray-300">
                                        <div className="flex items-center justify-center">
                                            <img
                                                onClick={() => updateModalContent(qr.urlredirect, qr.description1, qr.description2, qr.description3, qr.description4, qr.datecreate, qr.idqr, qr.qrstring, qr.counter)}
                                                src={imageRefresh}
                                                alt="icono de boton actualizar flechas en forma de circulo"
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 text-center border-b border-gray-300">
                                        <div className="flex items-center justify-center">
                                            <Tooltip title="QR desaparece de vista principal, pero se puede recuperar" position="top">
                                                <img
                                                    onClick={() => handlerDeleteQR(qr.idqr)}
                                                    src={imageDelete}
                                                    alt="icono de boton eliminar basurero con tapa"
                                                    className="cursor-pointer"
                                                />
                                            </Tooltip>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 text-center border-b border-gray-300">
                                        <div className="flex items-center justify-center">
                                            <img
                                                onClick={() => showQrcode(qr.qrstring)}
                                                src={qrCode}
                                                alt="icono de boton qr forma de codigo qr"
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <ReactTooltip id="my-tooltip" effect="solid" place="bottom" />
        </div>
    );
}

export default Home;


