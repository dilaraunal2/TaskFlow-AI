const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // .env dosyasını okur

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Routes
const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

// Basit test route'u
app.get("/", (req, res) => {
  res.send("TaskFlow AI Backend Çalışıyor 🚀");
});

// MongoDB bağlan
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB bağlantısı başarılı ✅"))
.catch(err => console.error("MongoDB bağlantı hatası ❌:", err));

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
