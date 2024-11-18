const express = require("express");
const cors = require("cors");
const axios = require("axios");
const https = require("https");

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
    const { baseURL, part, id, key } = req.query;

    if (!baseURL || !part || !id || !key) {
        return res.status(400).json({
            error: "baseURL, part, id, and key are required query parameters.",
        });
    }

    const url = `${baseURL}?part=${part}&id=${id}&key=${key}`;

    try {
        const agent = new https.Agent({ rejectUnauthorized: false });

        const response = await axios.get(url, { httpsAgent: agent });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Error in proxy request:", error.message);

        if (error.response) {
            console.error("Full error response:", error.response.data);
        }

        res.status(error.response?.status || 500).json({
            error: error.response?.data || error.message,
        });
    }
});

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Proxy server running on http://localhost:${PORT}`)
);
