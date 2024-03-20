import React from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { birimSec } from "../../features/birimler/birimSlice";
import BarLoader from "react-spinners/BarLoader";
import { login,reset } from "../../features/yoneticiler/yoneticiSlice";
import { loginGoogle } from '../../features/kullanicilar/kullaniciSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { secilenBirim, isLoading } = useSelector((state) => state.birimState);
  const { yonetici,message } = useSelector((state) => state.yoneticiState);
  const {kullanici}=useSelector((state)=>state.kullaniciState)

  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const handleYoneticiGiris = (e) => {
    e.preventDefault();

    const veri = {
      email,
      parola,
    };

    dispatch(login(veri));
  };
  const handleKullaniciGiris=(e)=>{
    e.preventDefault();
  
    dispatch(loginGoogle())
  
  }

  useEffect(() => {
    const secilenBirimId = localStorage.getItem("secilenBirim");

    if (!secilenBirimId) {
      navigate("/");
    }

    dispatch(birimSec(JSON.parse(secilenBirimId)));
  }, []);
  useEffect(() => {
    if(yonetici){
      if( secilenBirim){

        if(yonetici.yetki==="admin"){
          localStorage.setItem('yonetici',JSON.stringify({uid:yonetici.uid}))
          //console.log("admin sayfasına yönlensin");
          navigate('/admin')
        }else if(yonetici.yetki==="moderatör"){
            if(yonetici.yetkiliBirimId===secilenBirim.id){
              localStorage.setItem('yonetici',JSON.stringify({uid:yonetici.uid}))
              //console.log("moderatör sayfasına yönlensin");
              navigate('/moderator')
            }else{
              //console.log("yetkisiz giriş");
              toast.error("yetkisiz giriş yapılmaya çalışıldı")
            }
        }
      }else{
        //console.log("yetkisiz giriş");
       toast.error("yetkisiz giriş")
      } 

      
    }else{
      if(message){
        toast.error(message)
        dispatch(reset())
      }
    }
  }, [yonetici,message]);

  useEffect(()=>{

    if(kullanici!=null){
      navigate('/kullanici')
    }

  

  },[kullanici])
  return (
    <div className="text-center">
      <form className="form-signin">
        <div className="alert alert-secondary">
          <h1 className="h3 mb-2 font-weight-normal">
            AOS Randevu Alma Sistemi Girişi
          </h1>
          {isLoading ? (
            <BarLoader color="#9a8c98" width={400} />
          ) : (
            secilenBirim && <p className="text-danger">{secilenBirim.ad}</p>
          )}

          <Link to="/">Anasayfa için tıklayınız</Link>
        </div>
        <h3 className="mb-3">Kullanıcı Girişi</h3>

        <button className='btn btn-dark' onClick={handleKullaniciGiris}>Google  ile Giriş Yap</button>
        <p className="mt-5 mb-3 text-muted ">
          Randevu Almak için <FcGoogle size="2em" /> Hesabınız ile giriş yapınız
        </p>
        <hr />
        <h3 className="mt-5">Yönetici Girişi</h3>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          className="form-control"
          placeholder="Email adresinizi giriniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="parola"
          name="parola"
          className="form-control"
          placeholder="Parolanızı Giriniz"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
        />
        <br />
        <button
          className="btn btn-outline-primary mr-5"
          onClick={handleYoneticiGiris}
        >
          Yönetici Olarak Giriş Yap
        </button>
      </form>
    </div>
  );
}
