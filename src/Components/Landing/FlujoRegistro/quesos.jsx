import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Quesos = ()=>{
    const {user} = useAuth0();
    const navigate = useNavigate()
    const ownerRegister = async()=>{
        let owner = {
            email:user.email,
            name:user.given_name,
            lastName: user.family_name,
          }
          await axios.post('https://proyecto-grupal.herokuapp.com/owners', owner)
          navigate('/home')
    }
    const providerRegister = async()=>{
        let provider = {
            email:user.email,
            name:user.given_name,
            lastName: user.family_name,
          }
          await axios.post('https://proyecto-grupal.herokuapp.com/providers', provider)
          navigate('/infoProvider')
    }
    return(
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        }}>
        <div>
            <h1>Que tipo de cuenta te gustaria crear ?</h1>
        <button onClick={ownerRegister}>owner</button>
        <button onClick={providerRegister}>provider</button>
        </div>
        </div>
    )
}