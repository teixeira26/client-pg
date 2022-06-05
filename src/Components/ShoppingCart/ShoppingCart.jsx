import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import '../../index.css';
import NavBarShop from '../NavBar/NavBarShop';
import { useDispatch, useSelector } from 'react-redux';
import { chargeCart, clearAllCart } from "../../redux/actions/petshopActions";
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import MercadoPago from '../Shop/MercadoPago/MercadoPago';

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const { user } = useAuth0()
    const cart = useSelector(state => state.cart);
    console.log('CARRITO: ', cart);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user) {
            dispatch(chargeCart(user.email))
        }
    }, [user, dispatch]);

    useEffect(() => {
        var suma = 0;
        if (cart && cart.length) {
            cart.forEach(x => {
                suma += (x.price * x.quantity);
                console.log('TOTAL', total);
            }) 
            setTotal(suma);
        } else { setTotal(0);}
    }, [cart]);

    const clearCart = () => {
        dispatch(clearAllCart(user.email));
        setTotal(0);
    }

    return (
        <div>
            <NavBarShop />
            <h2>Carrito de Compras</h2>

            <NavLink to="/shop"><p>Volver al shop</p></NavLink>

            <h3>Productos</h3>
            <article className="box">
                <button onClick={clearCart}>Limpiar Carrito</button>
            </article>
            <article className="box grid-responsive">
                {
                    cart && cart.length > 0 ? cart.map((item, index) => (   //onClick={clearCart}
                        <CartItem key={index} name={item.name} image={item.profilePicture} price={item.price} quantity={item.quantity} id={item.id} stock={item.stock} />//delFromCart={delFromCart}
                    )) : <h1>No hay ningún producto en el carrito</h1>
                }
                <h3>total: {total}</h3>
                <MercadoPago cart={cart}
                             clearCart={clearCart}/> 

            </article>
            

        </div>
    )
};

export default ShoppingCart;