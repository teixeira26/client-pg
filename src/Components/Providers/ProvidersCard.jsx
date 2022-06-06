import styles from '../Providers/ProvidersCard.module.css';
import { Link } from 'react-router-dom';

export default function ProvidersCard({name, lastName, email, profilePicture, price, service}){

    return (
        <div className={styles.container}>
          <div className={styles.card}>
            {/* <ion-icon name="heart-outline"></ion-icon> */}
            <img src={profilePicture} alt="" className={styles.cardImg} />
            <div className={styles.cardInfo}>
              <h2 className={styles.cardTitle}>{name} {lastName}</h2>
              <div className={styles.cardBottom}>
                <h4 className={styles.price}>{service} - ${price}</h4>
                <Link to={`/providers/${email}`}>
                  <button className={styles.addButton}>Ver detalle</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
}