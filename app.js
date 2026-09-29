require("dotenv").config();

const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/lokasi", async (req, res) => {
    const kota = "Jogja";
    const apiKey = process.env.MAPTILER_API_KEY;
    const baseUrl = process.env.MAPTILER_BASE_URL;

    const url = `${baseUrl}/${kota}.json?key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const lokasi = data.features[0].matching_text; // Ambil lokasi dari hasil pencarian
        const koordinat = data.features[0].geometry.coordinates; // Ambil koordinat dari hasil pencarian

        res.json({
            kota: lokasi,
            koordinat: koordinat,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Gagal mengambil data lokasi dari MapTiler API" }); 
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
