import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);


// âœ… DATABASE â€” Read
app.get("/users", async (req, res) => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// âœ… STORAGE â€” Upload File
app.post("/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    const { data, error } = await supabase.storage
        .from("uploads")
        .upload(`uploads/${Date.now()}-${file.originalname}`, file.buffer, {
            contentType: file.mimetype,
        }); 

    if (error) return res.status(400).json({ error: error.message });
    res.json({ path: data.path });
});

// âœ… STORAGE â€” List Files
app.get("/files", async (req, res) => {
    const { data, error } = await supabase.storage.from("uploads").list("uploads");
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// âœ… STORAGE â€” Delete File
app.delete("/files/:fileName", async (req, res) => {
    const { fileName } = req.params;
    const { data, error } = await supabase.storage.from("uploads").remove([`uploads/${fileName}`]);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ deleted: data });
});

app.get("/", (req, res) => {
    res.send("Welcome to the Supabase Demo API!, Welcome to the Supabase Demo API!");
});
// Start server
app.listen(process.env.PORT, () =>
    console.log(` Server running on port ${process.env.PORT}`)
);