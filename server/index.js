//servidor API- donde creamos los metodos
//get obtener - post crear -put actualizar - delate eliminar

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());

app.use(express.json());

//RUTA 1: OBTENER LA LISTA DE LOS DOCENTES
app.get("/docentes", (req, res) => {
  const sql = "SELECT * FROM docentes";
  db.query(sql, (err, results) => {
    if (err) {
      //500 error interno del servidos (falló en la base de datos)
      return res.status(500).json({ error: "Error al obtener los docentes" });
    }
    res.json(results);
  });
});

//RUTA 2: OBTENER UN DOCENTE POR ID
app.get("/docentes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM docentes WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      //500 error interno del servidos (falló en la base de datos)
      return res.status(500).json({ error: "Error al obtener al docente" });
    }
    res.json(results);

    if (!results.length) {
      //404 no encontrado
      return res.status(404).json({ error: "Docente no encontrado" });
    }
    res.json(results[0]);
  });
});

//RUTA 3: GUARDAR UN DOCENTE
app.post("/docentes", (req, res) => {
  const {
    nombre,
    correo,
    telefono,
    titulo,
    area_academica,
    dedicacion,
    anios_experiencia,
  } = req.body;

  if (
    !nombre?.trim() ||
    !correo?.trim() ||
    !telefono?.trim() ||
    !titulo?.trim() ||
    !area_academica?.trim() ||
    !dedicacion?.trim()
  ) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const anios = Number(anios_experiencia);

  if (Number.isNaN(anios) || anios < 0) {
    return res
      .status(400)
      .json({ error: "Anios de experienca del docente invalidos" });
  }

  const sql =
    "INSERT INTO docentes (nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia) VALUES(?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      nombre.trim(),
      correo.trim(),
      telefono.trim(),
      titulo.trim(),
      area_academica.trim(),
      dedicacion.trim(),
      anios,
    ],
    (err, result) => {
      if (err) {
        //500 error interno del servidos (falló en la base de datos)
        return res.status(500).json({ error: "Error al guardar al docente" });
      }

      res.json({
        id: result.insertId,
        nombre: nombre.trim(),
        correo: correo.trim(),
        telefono: telefono.trim(),
        titulo: titulo.trim(),
        area_academica: area_academica.trim(),
        dedicacion: dedicacion.trim(),
        anios_experiencia: anios,
      });
    },
  );
});

//RUTA 4: Actualizar un docente
app.put("/docentes/:id", (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    correo,
    telefono,
    titulo,
    area_academica,
    dedicacion,
    anios_experiencia,
  } = req.body;

  if (
    !nombre?.trim() ||
    !correo?.trim() ||
    !telefono?.trim() ||
    !titulo?.trim() ||
    !area_academica?.trim() ||
    !dedicacion?.trim()
  ) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const anios = Number(anios_experiencia);

  if (Number.isNaN(anios) || anios < 0) {
    return res
      .status(400)
      .json({ error: "Anios de experienca del docente invalidos" });
  }

  const sql =
    "UPDATE docentes SET nombre=?, correo=?, telefono=?, titulo=?, area_academica=?, dedicacion=?, anios_experiencia=? WHERE id= ?";
  db.query(
    sql,
    [
      nombre.trim(),
      correo.trim(),
      telefono.trim(),
      titulo.trim(),
      area_academica.trim(),
      dedicacion.trim(),
      anios,
      id,
    ],
    (err) => {
      if (err) {
        //500 error interno del servidos (falló en la base de datos)
        return res
          .status(500)
          .json({ error: "Error al actualizar al docente" });
      }
      res.json({ message: "Docente actualizado correctamente" });
    },
  );
});

//RUTA 5: Eliminar docentes
app.delete("/docentes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM docentes WHERE id= ?";
  db.query(sql, [id], (err) => {
    if (err) {
      //500 error interno del servidos (falló en la base de datos)
      return res.status(500).json({ error: "Error al eliminar el docente" });
    }
    res.json({ message: "Docente eliminado correctamente" });
  });
});

//Por último el servidor correra desde el puerto 3001
app.listen(3001, () => {
  console.log("Servidor corriendo desde el puerto 3001");
});
