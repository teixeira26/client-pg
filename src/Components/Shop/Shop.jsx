import React, { useEffect, useState } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import styles from "../Shop/Shop.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";
import ProductCard from "./ProductCard";
import { getProducts, chargeCart, getFavoritesProducts} from "../../redux/actions/petshopActions";
import { useDispatch, useSelector } from "react-redux";
import ShopSearchbar from "./ShopSearchbar";
import ShopFilters from "./ShopFilters";
import { NavLink } from "react-router-dom";


import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Shop = () => {
  const products = useSelector((state) => state.filteredProducts);
  const {user} = useAuth0();
  const [favorites, setFavorites] = useState([]);



  let dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://proyecto-grupal.herokuapp.com/owners/getFavorites/${user.email}`).then(x=>{
    console.log(x.data)
    setFavorites(x.data)
  })
    dispatch(getProducts());
    dispatch(chargeCart(user.email))

  }, [dispatch, user.email]);


  return (
    <div className={styles.container}>
      <NavBarShop />

      <div className={inContainer.container}>
      <NavLink to="/home">
          <img src="/assets/img/left-arrow.png" alt="" className={styles.leftArrow}/>
        </NavLink>

        <h1 className={styles.shopTitle}>Pet Shop</h1>
        
        <div className={styles.shopFlex}>
          <div className={styles.shopFilters}>
            <ShopSearchbar />
            <ShopFilters />
            </div>

            <br />
          <section className={styles.shopGrid}>
            {!products.length
              ? "LOADING"
              : products.map((p) => {
                  return (
                    p.stock > 0 ?
                    // <a href={`http://localhost:3000/shop/${p.id}`} key={p.id}>
                      <ProductCard
                        key={p.id}
                        id={p.id}
                        setFavorites={setFavorites}
                        favorites={favorites}
                        isFavorite={favorites&&favorites.includes(p.id)}
                        profilePicture={p.profilePicture}
                        name={p.name}
                        price={p.price}
                      /> 
                      : null

                    // </a>

                  );
                })}
          </section>
        </div>

      
    </div>
    <Footer />
    </div>
  );
};

export default Shop;