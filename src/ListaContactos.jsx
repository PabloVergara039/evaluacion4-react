import React, { useState } from 'react';

const ListaContactos = ({ contactos, eliminarContacto, ordenarPorNombre, actualizarContactos }) => {
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [editandoContacto, setEditandoContacto] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [criterioBusqueda, setCriterioBusqueda] = useState('');
  const contactsPerPage = 4;

  const editarContactoLocal = (index) => {
    setEditandoIndex(index);
    setEditandoContacto({ ...contactos[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditandoContacto({
      ...editandoContacto,
      [name]: value,
    });
  };

  const actualizarContacto = () => {
    if (editandoIndex !== null) {
      const nuevosContactos = contactos.map((contacto, index) =>
        index === editandoIndex ? editandoContacto : contacto
      );
      actualizarContactos(nuevosContactos);
      cancelarEdicion();
    }
  };

  const cancelarEdicion = () => {
    setEditandoIndex(null);
    setEditandoContacto({});
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBusqueda = (e) => {
    setCriterioBusqueda(e.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * contactsPerPage;

  const filteredContacts = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(criterioBusqueda.toLowerCase()) ||
    contacto.apellido.toLowerCase().includes(criterioBusqueda.toLowerCase()) ||
    contacto.email.toLowerCase().includes(criterioBusqueda.toLowerCase()) ||
    contacto.telefono.includes(criterioBusqueda)
  );

  const selectedContacts = filteredContacts.slice(startIndex, startIndex + contactsPerPage);

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div className="lista-container">
      <h2 id="arr">Lista de Contactos 📞📄</h2>
      <input
        type="text"
        placeholder="Buscar contactos..."
        value={criterioBusqueda}
        onChange={handleBusqueda}
        className="campo-busqueda form-control mb-2"
      />
      <button className="btn btn-danger mb-2" onClick={ordenarPorNombre}>
        Ordenar por nombre
      </button>
      <div className="contactos-grid">
        {selectedContacts.map((contacto, index) => (
          <div key={startIndex + index} className="contacto-card card mb-3">
            {editandoIndex === startIndex + index ? (
              <div className="card-body">
                <input
                  type="text"
                  name="nombre"
                  value={editandoContacto.nombre || ''}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="apellido"
                  value={editandoContacto.apellido || ''}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
                <input
                  type="email"
                  name="email"
                  value={editandoContacto.email || ''}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="telefono"
                  value={editandoContacto.telefono || ''}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
                <button className="btn btn-success me-2" onClick={actualizarContacto}>
                  <i className="bi bi-floppy-fill"></i> Guardar
                </button>
                <button className="btn btn-secondary" onClick={cancelarEdicion}>
                  <i className="bi bi-x-lg"></i> Cancelar
                </button>
              </div>
            ) : (
              <div className="card-body">
                <p>
                  <strong>Nombre:</strong> {contacto.nombre}
                </p>
                <p>
                  <strong>Apellido:</strong> {contacto.apellido}
                </p>
                <p>
                  <strong>Correo:</strong> {contacto.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {contacto.telefono}
                </p>
              </div>
            )}
            <div className="card-footer">
              <button className="btn btn-danger me-2" onClick={() => eliminarContacto(startIndex + index)}>
                <i className="bi bi-trash-fill"></i> Eliminar
              </button>
              <button className="btn btn-primary" onClick={() => editarContactoLocal(startIndex + index)}>
                <i className="bi bi-pencil-fill"></i> Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListaContactos;
