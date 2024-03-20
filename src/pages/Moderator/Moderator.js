import React from "react";
import "./Moderator.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { birimSec } from "../../features/birimler/birimSlice";
import {
  cikisYap,
  sonOnbirimRandevularGetir,
} from "../../features/yoneticiler/yoneticiSlice";
import { getAuth, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Moderator() {
  const { yonetici, isSuccess, randevular } = useSelector(
    (state) => state.yoneticiState
  );
  const { secilenBirim, isLoading } = useSelector((state) => state.birimState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [yeniParola, setYeniParola] = useState("");
  const [yeniParolaTekrar, setYeniParolaTekrar] = useState("");
  const handleClick = () => {
    //console.log(yeniParola,yeniParolaTekrar);
    if (yeniParola === yeniParolaTekrar) {
      updatePassword(user, yeniParola)
        .then(() => {
          toast.success("Parolanız değiştirildi.");
        })
        .catch((error) => {
          toast.error("Bir hata oluştu. Çıkış yapıp tekrar giriniz.");
        });
    }
  };

  const handleCikisYap=()=>{
    dispatch(cikisYap());
    navigate("/")

  }
   
  const auth = getAuth();

  const user = auth.currentUser;

  useEffect(() => {
    const secilenBirimId = localStorage.getItem("secilenBirim");
    if (yonetici) {
      if (yonetici.yetki !== "moderatör") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    if (!secilenBirimId) {
      navigate("/");
    }

    dispatch(birimSec(JSON.parse(secilenBirimId)));
    dispatch(sonOnbirimRandevularGetir(JSON.parse(secilenBirimId)));
  }, [isSuccess]);
  return (
    <div className="moderator">
      <div className="alert-alert- secondary" role="alert">
        <span>{secilenBirim && <strong>{secilenBirim.ad} </strong>} için moderatör paneline
        hoşgelidniz.
       </span>
       <div className="text-end">{yonetici && <span className="me-4"> Merhaba{yonetici.email}  </span>}
       <button className="btn btn-danger" onClick={handleCikisYap}>Çıkış </button>
       </div>
       </div>
       
       <div className="alert alert-primary" role="alert">
        <h3> Parola Değiştir</h3>
        <div className="mt-3">
          <div className="row">
            <div className="col-6">
              <p>{yonetici?.email} </p>
          </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="parola" className="form-label">Parolanız  </label>
              <input type="password" className="form-control" id="parola" name="parola" placeholder="Yeni parolanız"
              onChange={(e)=>setYeniParola(e.target.value)} value={yeniParola} />
             </div>

             <div className="col-6">
              < label htmlFor="parolaKontrol" className="form-label"> Parola Tekrarınız </label>
              <input type="password" className="form-control" id="parolaKontrol" name="parolaKontrol" placeholder="Yeni parola tekrarınız"
              onChange={(e)=>setYeniParolaTekrar(e.target.value)} value={yeniParolaTekrar} />
              </div> </div> </div>
              <div className="row mt-4">
                <div className="text-center">
                  <button className="btn btn-outline-primary btn-sm" onClick={handleClick}>DEĞİŞTİR </button>
                  </div> </div> </div> 

        
       



      <div className="alert alert-secondary" role="alert">
        <h5>Bekleyen Randevular</h5>
        <div className="mt-3">
          <div className="row mt-4">
            <ul className="list-group">
              {randevular &&
                randevular.map((randevu) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={randevu.belgeId}
                  >
                    {randevu.email}
                    <span className="badge bg-primary rounded-pill">
                      {randevu.tarih} - {randevu.saatText}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
