import express from "express";
import multer from "multer";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import authRoutes from "./auth/auth.js";
import { requireAuth } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:3000"],
    credentials: true,
  })
);
app.use("/auth", authRoutes);


// Multer setup (for file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// 🟢 Upload File
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = `uploads/${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) return res.status(400).json({ error: error.message });

    // Get Public URL
    const { data: publicData } = supabase.storage
      .from("uploads")
      .getPublicUrl(filePath);

    res.json({
      path: data.path,
      publicUrl: publicData.publicUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Get All Files
// 🟢 Get all files
app.get("/files", async (req, res) => {
  try {
    // Fetch files from "files" table
    const { data, error } = await supabase
      .from("files")
      .select("id, name, path, is_favorite, is_trashed");

    if (error) return res.status(400).json({ error: error.message });

    // Generate public URL for each file
    const filesWithUrl = data.map((file) => {
      const { data: urlData } = supabase
        .storage
        .from("uploads") // 👈 replace with your bucket name
        .getPublicUrl(file.path);

      return {
        ...file,
        public_url: urlData.publicUrl
      };
    });

    res.json(filesWithUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🟢 Delete file permanently from storage + DB
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Get file row first
    const { data: fileData, error: fetchError } = await supabase
      .from("files")
      .select("id, name, public_url")
      .eq("id", id)
      .single();

    if (fetchError) return res.status(400).json({ error: fetchError.message });
    if (!fileData) return res.status(404).json({ error: "File not found" });

    // Extract file name from public_url
    const fileName = decodeURIComponent(fileData.public_url.split("/").pop());

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from("uploads")
      .remove([`uploads/${fileName}`]);

    if (storageError) return res.status(400).json({ error: storageError.message });

    // Delete from DB
    const { error: dbError } = await supabase
      .from("files")
      .delete()
      .eq("id", id);

    if (dbError) return res.status(400).json({ error: dbError.message });

    res.json({ message: "File deleted permanently" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Move file to Trash
app.post("/trash/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("files")
    .update({ is_trashed: true })
    .eq("id", id)
    .select()   // ✅ correctly placed
    .single();

  if (error) {
    return res.status(500).json({ message: "Error trashing file.", error: error.message });
  }
  if (!data) {
    return res.status(404).json({ message: "File not found." });
  }

  res.json({ message: "File moved to trash.", file: data });
});

// 🟢 Restore file from Trash
app.post("/restore/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("files")
    .update({ is_trashed: false })
    .eq("id", id)
    .select()   // ✅ correctly placed
    .single();

  if (error) {
    return res.status(500).json({ message: "Error restoring file.", error: error.message });
  }
  if (!data) {
    return res.status(404).json({ message: "File not found." });
  }

  res.json({ message: "File restored.", file: data });
});










// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




