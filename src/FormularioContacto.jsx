import React, { useState } from 'react';
/*se importa el uuid4 de boostrap y se implementa al formulario*/
import uuid4 from 'uuid4'; 


const FormularioContacto = ({ agregarContacto }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validarNombreApellido = (valor) => {
    return /^[A-ZÁÉÍÓÚ][a-záéíóú]*$/.test(valor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let erroresValidacion = {};

    if (nombre.trim() === '') {
      erroresValidacion.nombre = 'El nombre es obligatorio.';
    } else if (!validarNombreApellido(nombre)) {
      erroresValidacion.nombre = 'El nombre debe empezar con mayúscula y contener solo letras.';
    }

    if (apellido.trim() === '') {
      erroresValidacion.apellido = 'El apellido es obligatorio.';
    } else if (!validarNombreApellido(apellido)) {
      erroresValidacion.apellido = 'El apellido debe empezar con mayúscula y contener solo letras.';
    }

    if (email.trim() === '') {
      erroresValidacion.email = 'El correo electrónico es obligatorio.';
    } else if (!validarEmail(email)) {
      erroresValidacion.email = 'El correo electrónico no tiene un formato válido.';
    }

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      setMensajeExito('');
      return;
    }

    const nuevoContacto = {
      id: uuid4(), 
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono
    };

    agregarContacto(nuevoContacto);
    setNombre('');
    setApellido('');
    setEmail('');
    setTelefono('');
    setErrores({});
    setMensajeExito('¡Contacto agregado exitosamente!');
  };

  return (
    <div className="formulario-container">
      <h2 id='arregl'>Agregar Nuevo Contacto 🤫</h2>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <form onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label>Nombre 📒:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>
        <div className="campo-formulario">
          <label>Apellido 📒:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          {errores.apellido && <span className="error">{errores.apellido}</span>}
        </div>
        <div className="campo-formulario">
          <label>Correo electrónico ✉️:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errores.email && <span className="error">{errores.email}</span>}
        </div>
        <div className="campo-formulario">
          <label>Teléfono 📞:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <button type="submit" className="boton-submit">
          <i className="bi bi-clipboard-check-fill">Agregar contacto</i> 
        </button>
      </form>
    </div>
  );
};

export default FormularioContacto;
