import React from "react";
import styles from "../styles/Creador.module.css"
import { useRef, useEffect, useState } from "react";
import QRCode from 'qrcode';
import { updateUser,getOneUser } from "../services/services";
import { correctMessage } from "../utils/AlertMessages";
import HandleError from "../services/HandleError"
import { ValidatorForm } from "../services/ValidatorForm";
import { qrEsquema } from "../utils/ValidaForm";
import { SortDate } from "../utils/SortDate";


const Creador = ({ closeModal, idUser, handleUpdateList }) => {

 const urlApi = useRef("http://3.145.168.47/api/qr/");    
  
  let idNewQr = useRef(0);
  let url = useRef(""); 
  let codigoQR = useRef();
  let listUpdate = useRef("");

  const [urlredirect, setUrlRedirect] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [description4, setDescription4] = useState("");
  const [idqr, setIdQr] = useState(0);
  const [datecreate, setDatecreate] = useState(new Date())
  const [qrstring, setQrString] = useState("");
  const [change, setChange] = useState(0);


  const infoQr = {
    idqr,
    urlredirect,
    qrstring,
    description1,
    description2,
    description3,
    description4,
    datecreate,
  }

  const searchQrId = async () =>{
    try {
      const data = await getOneUser(idUser);
      const qrSelected = data.data.user.qrcode;  
                    
      if(qrSelected.length !== 0){
        
        const lastQrSelected = qrSelected[qrSelected.length - 1];       
        idNewQr.current = lastQrSelected.idqr + 1;        
      }else{
        idNewQr.current = 1;
      }
      setIdQr(idNewQr.current);
      generateQRCode();
    } catch (error) {
      HandleError(error);
    }    
  }


  const generateQRCode = async () => {
    url.current = urlApi.current + idUser + idNewQr.current;
    try {      
      codigoQR.current = await QRCode.toString("", url.current, { width: 75, height: 75 });
      setQrString(codigoQR.current)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    searchQrId();   

  }, [change]);

  const update = async () => {
    try {
      const data = await updateUser(idUser, infoQr);      
      listUpdate.current = SortDate(data.data.result.qrcode);
      handleUpdateList(listUpdate.current);
      setDescription1("");
      setDescription2("");
      setDescription3("");
      setDescription4("");
      setUrlRedirect("");
      setDatecreate(new Date())
      setChange(idNewQr.current)
      correctMessage();
    } catch (error) {
      HandleError(error);
    }
  };

  const validaForm = () => {
    ValidatorForm(qrEsquema, infoQr, update);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <div className={styles.header}>
          <div>
            <h1>CREAR QR</h1>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: codigoQR.current }} />
          </div>
        </div>
        <div className={styles.formfield}>
          <label>URL de Inicio:</label>
          <input onChange={(e) => setUrlRedirect(e.target.value)} type="text" placeholder="https://www.yahoo.com" value={urlredirect}/>
        </div>
        <div className={styles.formfield}>
          <label>Descripción Uno:</label>
          <input onChange={(e) => setDescription1(e.target.value)} type="text" placeholder="ej: Nombre de la tienda" value={description1}/>
        </div>
        <div className={styles.formfield}>
          <label >Descripción Dos:</label>
          <input onChange={(e) => setDescription2(e.target.value)} type="text" placeholder="ej: Campaña" value={description2} />
        </div>
        <div className={styles.formfield}>
          <label >Descripción Tres:</label>
          <input onChange={(e) => setDescription3(e.target.value)} type="text" placeholder="ej: Comuna" value={description3}/>
        </div>
        <div className={styles.formfield}>
          <label >Descripción Cuatro:</label>
          <input onChange={(e) => setDescription4(e.target.value)} type="text" placeholder="ej: Promoción" value={description4} />
        </div>
        <div className={styles.formfield}>
          <label >Fecha de Creación:</label>
            <input type="text" value={datecreate} disabled />
        </div >
        <div className={styles.buttoncontainer}>
          <button onClick={() => validaForm()}>Guardar</button>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default Creador;