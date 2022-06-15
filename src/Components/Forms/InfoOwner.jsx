import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { Widget } from "@uploadcare/react-widget";
import { putOwnerInfo } from "../../redux/actions/ownProvActions";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import style from "./InfoOwner.module.css"
import axios from "axios";
import Swal from "sweetalert2";

export default function InfoOwner() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [infoProvider, setInfoProvider] = useState()

  useEffect(()=>{
    if(user){
        axios.get('http://localhost:3001/providers?filter=&order=ASC').then(x=>{
            setInfoProvider(x.data.find(x=>x.email === user.email))
        })
    }
},[user])
  const formik = useFormik({
    initialValues: {
      email: user.email,
      profilePicture: [],
      address: {},
    },
    validationSchema: yup.object({
      city: yup.string().required(),
      road: yup.string().required(),
      state: yup.string().required(),
    }),

    onSubmit: async (formData) => {
      console.log(formData)
      if(infoProvider){
      var newInfoProvider = ({...infoProvider, profilePicture:formData.profilePicture && formData.profilePicture.length?formData.profilePicture[0]:user.picture})}
      formData = {
        ...formData,
        address: {
          city: formData.city,
          road: formData.road,
          state: formData.state,
        },
      };
      console.log('form data después',formData);
      console.log('Info Provider',infoProvider);

      Swal.fire({
        title: 'Estás seguro que querés guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Informaciones guardadas!', '', 'success')
          await dispatch(putOwnerInfo(formData.email, formData));
          await axios.put('http://localhost:3001/providers/', newInfoProvider)
          navigate("/mi-perfil");
        } else if (result.isDenied) {
          Swal.fire('Los cambios no fueron guardados', '', 'info')
        }
      })

    },
  });

  return (
    <div>
      <NavBar />
      <Container>
        <div className={style.container}>
          <h2>Cambia tus datos</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              type="text"
              placeholder="Localidad"
              name="state"
              onChange={formik.handleChange}
              error={formik.errors.state}
            ></Form.Input>
            <Form.Input
              type="text"
              placeholder="Dirección"
              name="road"
              onChange={formik.handleChange}
              error={formik.errors.road}
            ></Form.Input>
            <Form.Input
              type="text"
              placeholder="Provincia"
              name="city"
              onChange={formik.handleChange}
              error={formik.errors.city}
            ></Form.Input>
            <label htmlFor="">Seleccioná una foto para tu perfil</label>
            <br />
            <Widget
              publicKey="269841dc43864e62c49d"
              id="file"
              name="photos"
              onChange={(e) => {
                formik.values.profilePicture.push(e.originalUrl);
                console.log(formik);
              }}
              perrito="profilePicture"
            />
            <br />
            <br />
            <Link to={`/mi-perfil`}>
              <Button>Cancelar cambios</Button>
            </Link>
            <Button type="submit">Confirmar cambios</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
