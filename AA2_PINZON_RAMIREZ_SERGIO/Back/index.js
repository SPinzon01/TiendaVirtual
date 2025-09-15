const express = require("express");
const { sequelize } = require("./models");
const deviceRoutes = require("./routes/Devices");
const userRoutes = require("./routes/Users");
const commentRoutes = require("./routes/Comments");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.use("/api/devices", deviceRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/comentarios", commentRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada ✅");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error("Error al sincronizar la base de datos:", err));
