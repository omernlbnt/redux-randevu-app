import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { cikisYap,moderatorlerGetir,birimeModeratorAta,reset,birimModeratorlerGetir } from "../../features/yoneticiler/yoneticiSlice";
import { birimlerGetir } from '../../features/birimler/birimSlice';
import "./Admin";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const { yonetici, isSuccess,moderatorler,moderatorAtamaMesaj,yetkililer } = useSelector((state) => state.yoneticiState);
  const {birimler}=useSelector((state)=>state.birimState)

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [birim,setBirim]=useState("")
  const [moderator,setModerator]=useState("")
  const handleYetkiliAta=()=>{

    if((birim!=="" && moderator !=="")&&(birim!=="1" && moderator !=="1")){
      
      const veri={
        birim,
        moderator
        }
    
        dispatch(birimeModeratorAta(veri))
      }
    
    }
  




  const handleCikis=()=>{
    
    dispatch(cikisYap());
  
    navigate('/')
  }
  

  useEffect(() => {
    if (yonetici) {
      if (yonetici.yetki !== "admin") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    dispatch(moderatorlerGetir())
    dispatch(birimlerGetir())
    dispatch(birimModeratorlerGetir())
  }, [isSuccess]);
  useEffect(()=>{

    if(moderatorAtamaMesaj!=""){
      toast.success(moderatorAtamaMesaj);
      dispatch(reset())
    }

    
  },[moderatorAtamaMesaj])


  return (
    <div className="admin">
      <div className="alert alert-secondary" role="alert">
        <span>Admin Paneline Hoş Geldiniz</span>
        <div className="text-end">
          {yonetici && <span className="me-4">Merhaba {yonetici.email} </span>}
          <button className="btn btn-danger"onClick={handleCikis}>Çıkış</button>
        </div>
      </div>
      <div className="alert alert-primary" role="alert">
        <h3>Yeni Moderatör Ekle</h3>
        <div className="mt-3">
          <div className="row">
            <div className="col-6">
              <label htmlFor="email" className="form-label">
                Email Adresi
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Yeni eklenecek moderator email adresi"
              />
            </div>
            <div className="col-6">
              <label htmlFor="parola" className="form-label">
                Parolası
              </label>
              <input
                type="email"
                className="form-control"
                id="parola"
                name="parola"
                placeholder="Yeni eklenecek moderator parolası"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="text-center">
              <button className="btn btn-outline-primary btn-sm">EKLE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-dark" role="alert">
        <h4>Birime Moderatör Yetkilisi Ver</h4>
        <div className="mt-3">
          <div className="row">
            <div className="col-6">
            <select className="form-select" aria-label="Default select example" onChange={(e)=>setBirim(e.target.value)} value={birim}> 
	<option value="">Birim Seçiniz</option>
	{birimler && birimler.map(birim=>(
	  <option value={birim.id} key={birim.id}>{birim.ad}</option>
	))}
</select>
            </div>
            <div className="col-6">
            <select className="form-select" aria-label="Default select example" onChange={(e)=>setModerator(e.target.value)} value={moderator}>
<option value="1" >Moderatör Seçiniz</option>
	{moderatorler && moderatorler.map(moderator=>(
	  <option value={moderator.id} key={moderator.id}>{moderator.email}</option>
	))}
</select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="text-center">
              <button className="btn btn-outline-dark btn-sm"onClick={handleYetkiliAta}>
                YETKİLİ ATA
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-secondary" role="alert">
  <h5>Birim Moderatörler</h5>
  <div className="mt-3">
	
	<div className='row mt-4'>
	  <ul className="list-group">
		  {yetkililer && yetkililer.map(yetkili=>(
			  <li className="list-group-item d-flex justify-content-between align-items-center" key={yetkili.email}>{yetkili.email} 
				<span className="badge bg-primary rounded-pill">{yetkili.birimAd}</span>
			  </li>
		  ))}
		  </ul>
	</div>
  </div>
</div>
    </div>
  );
}
