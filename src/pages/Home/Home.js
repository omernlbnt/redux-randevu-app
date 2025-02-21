import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react';
import { birimlerGetir } from '../../features/birimler/birimSlice';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';

export default  function Home(){

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {birimler,isLoading}=useSelector((state)=>state.birimState)

useEffect(()=>{
	
	dispatch(birimlerGetir())

},[])
const handleBirimSec=(id)=>{
  localStorage.setItem('secilenBirim',JSON.stringify(id))
  navigate('/login')

}

if(isLoading){
    return (

      <div className="text-center">
          <ClipLoader size={200} color='#bde0fe' />
      </div>

    )
  }


    return (
        <div className="text-center paper">
            <form className="text-center" >
                
            <div className="alert alert-primary text-center">
                <h1 className="h1 mb-2 font-weight-normal text-center">AOS Randevu Sistemi</h1>
            </div>
            {birimler.length>0 ? (
	<div className="row">

		{birimler.map(birim=>(
		  <div className="col mb-2 mt-4 pr-1" key={birim.id}>
			<p className="btn btn-primary" onClick={()=>handleBirimSec(birim.id)} >{birim.ad}</p>
		  </div>
		))}

	</div>
	):(
	   <div className="row">
			<div className="col mb-2 mt-4 pr-1">
				<p className='alert alert-secondary text-center'>Henüz birim</p>
			</div>
	   </div>
)}
            
            
            <p className="mt-5 mb-3 text-muted ">&copy; AOS Software 2023</p>
            
            </form>
        </div>
      )
}