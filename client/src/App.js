//Pantalla con la que el usuario estara interactuando
//useState permite guardar todo lo que ponga el usuario
//useEffect permite procesar o ejecutar cada que abrimos la página

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //interacción de la aplicación
  //Crear una memoria para el formulario (crear los estados)
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [titulo, setTitulo] = useState("");
  const [areaAcademica, setAreaAcademica] = useState("");
  const [dedicacion, setDedicacion] = useState("");
  const [aniosExperiencia, setAniosExperiencia] = useState(0);

  const [registros, setRegistros] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    cargarDocentes();
  }, []);

  //Función asincronica que le pide al servidor cargar todo los docentes
  const cargarDocentes = async () => {
    try {
      const response = await fetch("http://localhost:3001/docentes"); //abrir la dirección del servidor desde el navegador
      const data = await response.json(); //Convertir el texto en una lista usable
      setRegistros(data); //Guarda la lista y la dibuja
    } catch (error) {
      alert("Error al cargar el docente");
    }
  };

  //Limpiar formulario
  const limpiarFormulario = () => {
    setNombre("");
    setCorreo("");
    setTelefono("");
    setTitulo("");
    setAreaAcademica("");
    setDedicacion("");
    setAniosExperiencia(0);
  };

  //Crear función para registrar los docentes
  const registrarDatos = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      correo,
      telefono,
      titulo,
      area_academica: areaAcademica,
      dedicacion,
      anios_experiencia: aniosExperiencia,
    };

    if (editIndex !== null) {
      //camino de actualizar
      try {
        const docente = registros[editIndex];
        const response = await fetch(
          `http://localhost:3001/docentes/${docente.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[editIndex] = {
            ...docente,
            nombre,
            correo,
            telefono,
            titulo,
            area_academica: areaAcademica,
            dedicacion,
            anios_experiencia: aniosExperiencia,
          };
          setRegistros(nuevosRegistros);
          setEditIndex(null);
          alert("Docente actualizado correctamente");
        } else {
          const err = await response.json().catch(() => ({}));
          alert(err.error || "Error al actualizar el docente");
        }
      } catch (error) {
        alert("Error de conexión al actualizar un docente");
      }
    } else {
      try {
        //Camino de guardar
        const response = await fetch("http://localhost:3001/docentes/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
          setRegistros([...registros, data]);
          alert("Docente guardado correctamente");
        } else {
          alert(data.error || "Error al guardar el docente");
        }
      } catch (error) {
        alert("Error de conexión al guardar");
      }
    }
    limpiarFormulario();
  };

  const eliminarRegistro = async (idx) => {
    const docente = registros[idx];
    try {
      const response = await fetch(
        `http://localhost:3001/docentes/${docente.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setRegistros(registros.filter((_, i) => i !== idx));
        if (editIndex === idx) {
          setEditIndex(null);
          limpiarFormulario();
        }
        alert("Docente eliminado correctamente");
      } else {
        alert("Error al eliminar el docente");
      }
    } catch (error) {
      alert("Error de conexión al eliminar un docente");
    }
  };

  const editarRegistro = (idx) => {
    const reg = registros[idx];
    setNombre(reg.nombre);
    setCorreo(reg.correo);
    setTelefono(reg.telefono);
    setTitulo(reg.titulo);
    setAreaAcademica(reg.area_academica);
    setDedicacion(reg.dedicacion);
    setAniosExperiencia(reg.anios_experiencia);
    setEditIndex(idx);
  };

  //Estructura de la aplicación con el HTML
  return (
    <div className="container">
      <h1>Gestión de Docentes</h1>

      {/* Formulario de Entrada de Datos */}
      <div className="form-section">
        <h2>
          {editIndex !== null ? "Editar Docente" : "Registrar Nuevo Docente"}
        </h2>
        <form onSubmit={registrarDatos}>
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Título Profesional:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Área Académica:</label>
            <input
              type="text"
              value={areaAcademica}
              onChange={(e) => setAreaAcademica(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Dedicación:</label>
            <input
              type="text"
              value={dedicacion}
              onChange={(e) => setDedicacion(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Años de Experiencia:</label>
            <input
              type="number"
              value={aniosExperiencia}
              onChange={(e) => setAniosExperiencia(Number(e.target.value))}
              min="0"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit">
              {editIndex !== null ? "Actualizar" : "Guardar Registro"}
            </button>
            {editIndex !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditIndex(null);
                  limpiarFormulario();
                }}
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      <hr />

      {/* Tabla Visual de Registros Existentes */}
      <div className="table-section">
        <h2>Docentes Registrados</h2>
        {registros.length === 0 ? (
          <p>No hay registros de docentes disponibles en este momento.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Título</th>
                <th>Área Académica</th>
                <th>Dedicación</th>
                <th>Experiencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((docente, index) => (
                <tr key={docente.id || index}>
                  <td>{docente.nombre}</td>
                  <td>{docente.correo}</td>
                  <td>{docente.telefono}</td>
                  <td>{docente.titulo}</td>
                  <td>{docente.area_academica}</td>
                  <td>{docente.dedicacion}</td>
                  <td>{docente.anios_experiencia} años</td>
                  <td>
                    <button type="button" onClick={() => editarRegistro(index)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminarRegistro(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
