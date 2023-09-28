import React, { useState } from "react";
import "../hojas-de-estilos/BarraBusqueda.css";

const BarraBusqueda = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedOnly, setCompletedOnly] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  // const [editingTaskId, setEditingTaskId] = useState(null);


  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      completed: completedOnly,
      searchBy: searchBy,
    });
  };

  return (
    <div>
      <input
        type="text"
        className="control-de-formulario"
        placeholder="Ingrese tarea para buscar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="validacion-de-formulario">
        <input
          type="checkbox"
          className="verificacion-de-entrada"
          id="hechaCheck"
          checked={completedOnly}
          onChange={() => setCompletedOnly(!completedOnly)}
        />
        <label className="verificacion-de-formulario2" htmlFor="hechaCheck">
          Tarea Hecha
        </label>
      </div>
      <select
        className="control-de-formulario2"
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        <option value="" disabled >Seleccionar por:</option>
        <option value="fecha">Fecha</option>
        <option value="nombre">Nombre</option>
      </select>
      <button className="btn3" type="button" onClick={handleSearch}>
        <h1>Buscar</h1>
      </button>
    </div>
  );
};

export default BarraBusqueda;
