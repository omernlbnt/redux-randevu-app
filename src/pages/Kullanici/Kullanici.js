import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { birimSec } from "../../features/birimler/birimSlice";
import Modal from "react-modal";
import { motion } from "framer-motion";
import {
  kullaniciDoldur,
  tarihlerGetir,
  randevuOlustur,cikisYap
} from "../../features/kullanicilar/kullaniciSlice";
import "./Kullanici.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Kullanici() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { kullanici, randevuSaatler } = useSelector(
    (state) => state.kullaniciState
  );
  const { secilenBirim, isLoading } = useSelector((state) => state.birimState);
  const bugun = new Date();
  const formatlanmisTarih =
    bugun.getDate() + "." + (bugun.getMonth() + 1) + "." + bugun.getFullYear();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secilenSaat, setSecilenSaat] = useState(null);
  const [secilenDeger,setSecilenDeger]=useState(null)
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#bde0fe",
    },
  };
  Modal.setAppElement("#root");

  const handleRandevuAyarla = (veri) => {
    setModalIsOpen(true);
    setSecilenSaat(veri.text);
    setSecilenDeger(veri);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const randevuEkle=()=>{
    const veri={
      birimId:secilenBirim.id,
      birimAd:secilenBirim?.ad,
      saatDeger:secilenDeger.deger,
      saatText:secilenDeger.text,
      tarih:formatlanmisTarih,
      email:kullanici.email
    }
  
  
  
    dispatch(randevuOlustur(veri))
    setModalIsOpen(false);
    toast.success("Randevunuz Oluşturuldu");
    setTimeout(()=>{
      navigate('/randevularim')
    },1000)


};

  useEffect(() => {
    if (!kullanici) {
      navigate("/login");
    }
  }, [kullanici]);

  useEffect(() => {
    const secilenBirimId = localStorage.getItem("secilenBirim");

    if (!secilenBirimId) {
      navigate("/");
    }

    if (!kullanici) {
      navigate("/login");
    }

    dispatch(birimSec(JSON.parse(secilenBirimId)));
    dispatch(kullaniciDoldur());
    dispatch(tarihlerGetir(JSON.parse(secilenBirimId)));
  }, []);

  const handleYonlen=()=>{
    navigate("/randevularim")
  }
  const handleCikisYap=()=>{
    
    dispatch(cikisYap());
  
    navigate('/')
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <p>
            <strong>{secilenBirim?.ad}</strong> birimi için{" "}
          </p>
          <p>
            <strong>{formatlanmisTarih}</strong> tarihi ve{" "}
            <strong>{secilenSaat}</strong> saatine randevu alıyorsunuz
          </p>
          <p>Onaylıyor musunuz?</p>
          <p className="d-flex justify-content-center">
            <button
              className="btn btn-outline-danger btn-sm m-4"
              onClick={closeModal}
            >
              İptal Et
            </button>
            <button className="btn btn-outline-success btn-sm m-4"onClick={randevuEkle}>
              Kabul Et
            </button>
          </p>
        </motion.div>
      </Modal>
      <div className="kullanici">
        <motion.div className="alert alert-secondary" role="alert" initial={{y:"-100vh"}} 
	animate={{y:0}}  transition={{  duration:2}}>
          {kullanici && (
            <p>
              Merhaba <strong>{kullanici.email}</strong>
            </p>
          )}
          {secilenBirim && (
            <p>
              <strong className="bold">{secilenBirim.ad}</strong> için randevu
              alınız
            </p>
          )}
           <p className='d-flex justify-content-between'>
	<button className='btn btn-outline-primary btn-sm mx-4' onClick={handleYonlen}>Randevularım</button>
	<button className='btn btn-outline-danger btn-sm mx-4'onClick={handleCikisYap}>Çıkış</button>
 </p>
        </motion.div>

        <div className="alert alert-primary" role="alert">
          <h3>Randevu Saatini Seçiniz</h3>
          <div className="mt-3">
            <p>{formatlanmisTarih} için randevu alınız</p>
            <div className="row mt-4">
              {/* <div>
            {
              veriSetleri.map(veri=>(
                <button className='btn btn-outline-primary btn-sm m-2'>{veri.text}</button>
              ))
            }
          </div> */}
              <div className="col-6 container">
                {randevuSaatler?.map((veri) => (
                  <button
                    key={veri.deger}
                    className={`btn btn-outline-dark btn-sm m-4 ${
                      veri.pasifMi === true ? "disabled" : ""
                    }`}
                    onClick={() => handleRandevuAyarla(veri)}
                  >
                    {veri.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
