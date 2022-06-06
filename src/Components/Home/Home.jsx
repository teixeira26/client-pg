import React, {useEffect} from "react";
import styles from "../Home/Home.module.css";
import NavBarRegistered from "../NavBar/NavBarRegistered";
import NavBarShop from '../NavBar/NavBarShop'
import inContainer from "../GlobalCss/InContainer.module.css";
import HomeCard from "./HomeCard";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()

  useEffect(()=>{
    (async()=>{
      let owner = {
          email:user.email,
          name:user.given_name,
          lastName: user.family_name,
        }
        await axios.post('https://proyecto-grupal.herokuapp.com/owners', owner)
        navigate('/home')
  })()
  }, [])

  return (
    <div className={styles.body}>
      {isAuthenticated && console.log(user)}


        <NavBarShop/>


      <div className={inContainer.container}>
        <h1 className={styles.homeTitle}>¿Qué estás buscando?</h1>

        <div className={styles.cardWrapper}>
          <Link to='/providers'>
          <HomeCard name='Paseos y hospedaje' img='assets/img/paseador.png'/>
          </Link>
          <Link to="/shop">
            <HomeCard name='Comprar productos' img='assets/img/shop.png'/>
          </Link>
        </div>
      </div>

      <div className={styles.stickyFooter}>
        <Footer />
      </div>
      
    </div>
  );
};

export default Home;
