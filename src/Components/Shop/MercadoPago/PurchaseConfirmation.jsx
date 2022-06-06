import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MercadoPago from "./MercadoPago";
import { chargeCart } from "../../../redux/actions/petshopActions";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import InContainer from "../../GlobalCss/InContainer.module.css";
import PurchaseDetail from "./PurchaseDetail";
import NavBar from "../../NavBar/NavBarShop";
import Footer from "../../Footer/Footer";

export default function PurchaseConfirmation() {
  const { user, isAuthenticated } = useAuth0();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(chargeCart(user.email));
    }
  }, [dispatch, user]);

  useEffect(() => {
    var suma = 0;
    if (cart && cart.length) {
      cart.forEach((x) => {
        suma += x.price * x.quantity;
        console.log("TOTAL", total);
      });
      setTotal(suma);
    } else {
      setTotal(0);
    }
  }, [cart]);

  return (
    <div>
      <NavBar />
      <div className={InContainer.container}>
        {/* <img src="./assets/img/arrow-left.svg" alt="" /> */}
        <h2>Detalle de tu compra</h2>
        {cart && cart.length > 0 ? (
          cart.map((item, index) => (
            <PurchaseDetail
              key={index}
              name={item.name}
              image={item.profilePicture}
              price={item.price}
              quantity={item.quantity}
            />
          ))
        ) : (
          <h1>No hay ningún producto en el carrito</h1>
        )}

        <h4>TOTAL COMPRA: {total}</h4>

        <h2>Continuá con el pago</h2>
        <MercadoPago cart={cart} />

        <Link to="/shoppingcart">
          <button>Volver al carrito</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
