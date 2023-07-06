import React from "react";
import styles from "../styles/Creador.module.css"
import { useRef, useState } from "react";
import { correctMessageActualizado } from "../utils/AlertMessages";
import HandleError from "../services/HandleError"
import { ValidatorForm } from "../services/ValidatorForm";
import { qrEsquema } from "../utils/ValidaForm";
import { SortDate } from "../utils/SortDate";
import { updateUserQR } from "../services/services";


const Actualizador = ({ idUserTemp, urlredirectTemp, description1Temp, description2Temp, description3Temp, description4Temp, 
    datecreateTemp, idqrTemp, qrstringTemp, counterTemp, closeModalActualizador, handleUpdateList }) => {
  
  const [urlredirectOriginal, setUrlRedirectOriginal] = useState(urlredirectTemp);
  const [urlredirect, setUrlRedirect] = useState(urlredirectTemp);
  const [description1, setDescription1] = useState(description1Temp);
  const [description2, setDescription2] = useState(description2Temp);
  const [description3, setDescription3] = useState(description3Temp);
  const [description4, setDescription4] = useState(description4Temp);
  const [idqr, setIdQr] = useState(idqrTemp);
  const [datecreate, setDatecreate] = useState(new Date(datecreateTemp));
  const [idUser, setIdUser] = useState(idUserTemp);
  const [counter, setcounter] = useState(counterTemp);
  let listUpdate = useRef("");
  let codigoQR = useRef(qrstringTemp);
 
  const infoQr = {
    urlredirect,
    description1,
    description2,
    description3,
    description4,
    counter,
    idqr,
    urlredirectOriginal,
  }

  const update = async () => {
    try {
      const data = await updateUserQR(idUser, infoQr); 
      listUpdate.current = SortDate(data.data.result.qrcode);
      handleUpdateList(listUpdate.current);
      setDescription1("");
      setDescription2("");
      setDescription3("");
      setDescription4("");
      setUrlRedirect("");
      correctMessageActualizado();   
      closeModalActualizador();
    } catch (error) {
       console.log(error)
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
            <h1>MODIFICAR QR</h1>
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
          <button onClick={closeModalActualizador}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default Actualizador;