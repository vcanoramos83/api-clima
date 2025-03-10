require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const CITY = "Zaragoza"; // Ciudad fija por ahora

app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
  res.send(
    "¡Bienvenido a la API del clima de Zaragoza! Usa /clima para ver el clima actual."
  );
});

// Ruta para obtener el clima
app.get("/clima", async (req, res) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=es`;
    const response = await axios.get(url);

    res.json({
      ciudad: response.data.name,
      temperatura: response.data.main.temp,
      descripcion: response.data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el clima" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
