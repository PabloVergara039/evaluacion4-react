import React, { useState, useEffect } from 'react';
import FormularioContacto from './FormularioContacto';
import ListaContactos from './ListaContactos';
import uuid4 from 'uuid4';


const App = () => {
  const KEY = 'contactos';
  const [contactos, setContactos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [ordenNombreAscendente, setOrdenNombreAscendente] = useState(true);

  useEffect(() => {
    const storedContactos = JSON.parse(localStorage.getItem(KEY));
    if (storedContactos) {
      setContactos(storedContactos);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto]);
  };

  const eliminarContacto = (index) => {
    const nuevosContactos = contactos.filter((_, i) => i !== index);
    setContactos(nuevosContactos);
  };

  const actualizarContactos = (nuevosContactos) => {
    setContactos(nuevosContactos);
  };

  const handleSearch = (termino) => {
    setTerminoBusqueda(termino);
  };

  const ordenarPorNombre = () => {
    const nuevosContactos = [...contactos];
    nuevosContactos.sort((a, b) => {
      if (ordenNombreAscendente) {
        return a.nombre.localeCompare(b.nombre); 
      } else {
        return b.nombre.localeCompare(a.nombre); 
      }
    });
    setContactos(nuevosContactos);
    setOrdenNombreAscendente(!ordenNombreAscendente);
  };

  const contactosFiltrados = contactos.filter(contacto =>
    contacto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    contacto.apellido.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    contacto.email.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    contacto.telefono.includes(terminoBusqueda)
  );

  return (
    <div className="app-container">
      <h1 className='text-center' id='yoo'>Directorio de Contactos 📒📞</h1>
      <FormularioContacto agregarContacto={agregarContacto} />
      <ListaContactos
        contactos={contactosFiltrados}
        eliminarContacto={eliminarContacto}
        actualizarContactos={actualizarContactos}
        ordenarPorNombre={ordenarPorNombre}
        criterioBusqueda={terminoBusqueda}
        setCriterioBusqueda={setTerminoBusqueda}
      />
    </div>
  );
};

export default App;
