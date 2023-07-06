import React, { useState, useRef, useEffect } from "react";
import Creador from "../componentes/Creador";
import styles from "../styles/Home.module.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getOneUser, deleteUserQR } from "../services/services";
import HandleError from "../services/HandleError";
import imageDelete from "../assets/image/delete.png"
import qrCode from "../assets/image/qr-code.png"
import imageRefresh from "../assets/image/refresh.png"
import moment from 'moment';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { SortDate } from "../utils/SortDate";
import { updateMessageView, deleteQrMessage, searchErrorMessage,messageExit } from "../utils/AlertMessages";
import Actualizador from "./Actualizador";
import { ConsultaAccion } from "../utils/ConsultaAccion";
import { userLogout } from "../services/services";


function Home() {

    const location = useLocation();
    
    const idUser = useRef(location.state.id);
    const correo = useRef(location.state.email);
    const navigate = useNavigate();
   

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const [userQr, setUserQr] = useState("");
    const [updateView, setUpdateView] = useState(false);  
    const [isOpenActualizador, setIsOpenActualizador] = useState(false);
    const [searchDescription, setSearchDescription] = useState("");
    let urlredirect = useRef("");
    let description1 = useRef("");
    let description2 = useRef("");
    let description3 = useRef("");
    let description4 = useRef("");
    let datecreate = useRef("");
    let idqr = useRef(0);
    let qrstring = useRef("");
    let counter = useRef(0);
    const text1 = "Eliminación de Qr"
    const text2 = "Estas seguro de Eliminar QR?"
    let filter = useRef("");

    const closeModal = () => {
        setIsOpen(false);
    };

    const closeModalActualizador = () => {
        setIsOpenActualizador(false);
    };


    const search = async () => {
        try {
            const data = await getOneUser(idUser.current);
            const result = SortDate(data.data.user.qrcode);
            setUserQr(result);
            if (updateView === true) {
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
            const result = SortDate(data.data.result.qrcode);
            setUserQr(result);
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
                return (
                    palabraComparar1.includes(palabraFiltrar) ||
                    palabraComparar2.includes(palabraFiltrar) ||
                    palabraComparar3.includes(palabraFiltrar) ||
                    palabraComparar4.includes(palabraFiltrar)
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
                return (
                    palabraComparar1.includes(palabraFiltrar) ||
                    palabraComparar2.includes(palabraFiltrar) ||
                    palabraComparar3.includes(palabraFiltrar) ||
                    palabraComparar4.includes(palabraFiltrar)
                  );
            })
         
        } else if (selectedDate === null && selectedDate2 === null && searchDescription.length > 0) {

             filter.current = userQr.filter(item => {
                const palabraFiltrar = searchDescription.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar1 = item.description1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar2 = item.description2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar3 = item.description3.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const palabraComparar4 = item.description4.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                    palabraComparar1.includes(palabraFiltrar) ||
                    palabraComparar2.includes(palabraFiltrar) ||
                    palabraComparar3.includes(palabraFiltrar) ||
                    palabraComparar4.includes(palabraFiltrar)
                  );
            })
        }
        
        if(filter.current.length > 0){
            setUserQr(SortDate(filter.current));
        }else{
            searchErrorMessage();
        }    
    }
    
    const actualizarVariables = () =>{        
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
            console.log(error)
            HandleError(error);
        }
    }


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>QR dynamic Manager</h1>
                    <p>Tu solución inteligente para administrar y potenciar tus códigos QR.</p>
                    <button onClick={logout} className={styles.logout}>Cerrar Sesión</button>
                </div>
            </header>
            <main>
                <div className={styles.filterbar}>
                    <p>Filtrado por fecha(s):</p>
                    <div className={styles.filterbydate}>
                        <div>
                            <div> <DatePicker className={styles.datePick} selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="dd/MM/yyyy" /></div>
                            <div> <DatePicker className={styles.datePick} selected={selectedDate2} onChange={date => setSelectedDate2(date)} dateFormat="dd/MM/yyyy" /></div>
                        </div>
                    </div>
                    <p>Por descripción:</p>
                    <div className={styles.filterbydescription}>
                        <input onChange={(e) => setSearchDescription(e.target.value)} type="text" value={searchDescription}></input>
                    </div>
                    <button onClick={() => filtrar()} className={styles.fitrarqrbutton}>Filtrar</button>
                    <button onClick={() => setIsOpen(true)} className={styles.createqrbutton}>Crear QR</button>
                    {isOpen && (
                        <Creador closeModal={closeModal} idUser={idUser.current} handleUpdateList={handleUpdateList} />
                    )}
                    {isOpenActualizador && (
                        <Actualizador idUserTemp={idUser.current} urlredirectTemp={urlredirect.current} description1Temp={description1.current}
                            description2Temp={description2.current} description3Temp={description3.current} description4Temp={description4.current}
                            datecreateTemp={datecreate.current} idqrTemp={idqr.current} qrstringTemp={qrstring.current} counterTemp={counter.current} closeModalActualizador={closeModalActualizador} handleUpdateList={handleUpdateList} />
                    )}
                </div>
                <div className={styles.updateview}><button onClick={() => setUpdateView(true)}>Recargar todos</button></div>
                <div className={styles.tablecontainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Creación</th>
                                <th>Enlace</th>
                                <th>Descripción</th>
                                <th>Descripción</th>
                                <th>Descripción</th>
                                <th>Descripción</th>
                                <th>Visitas</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                                <th>Descargar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userQr && userQr.map((qr, index) => (
                                <tr key={index}>
                                    <td>{moment(qr.datecreate).format('DD/MM/YYYY')}</td>
                                    <td><Link to={qr.urlredirect} target="_blank">{qr.urlredirect}</Link></td>
                                    <td>{qr.description1}</td>
                                    <td>{qr.description2}</td>
                                    <td>{qr.description3}</td>
                                    <td>{qr.description4}</td>
                                    <td className={styles.counter}>{qr.counter}</td>
                                    <td className={styles.img}><img onClick={() => updateModalContent(qr.urlredirect, qr.description1,
                                        qr.description2, qr.description3, qr.description4, qr.datecreate, qr.idqr, qr.qrstring, qr.counter)} src={imageRefresh} alt="icono de boton actualizar flechas en forma de circulo" /></td>
                                    <td className={styles.img}><img onClick={() => handlerDeleteQR(qr.idqr)} src={imageDelete} alt="icono de boton eliminar basurero con tapa" /></td>
                                    <td className={styles.img}><img onClick={() => downloadSVG(qr.qrstring)} src={qrCode} alt="icono de boton qr forma de codigo qr" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Home;


