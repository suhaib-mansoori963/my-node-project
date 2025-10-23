const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://suhaibmansoori963_db_user:Pueju4vd7FHUrG7O@cluster0.ybcaoh1.mongodb.net/productsDB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Product Schema & Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Products API 🚀");
});

// ✅ GET - sab products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ POST - naya product add
app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product({ name: req.body.name });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// ✅ PUT - product update
app.put("/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ✅ DELETE - product delete
app.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// ✅ Server listen
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
