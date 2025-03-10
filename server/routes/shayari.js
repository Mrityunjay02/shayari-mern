import { Router } from "express";
import {
  addShayaris,
  deleteShayaris,
  getShayaris,
  editShayaris,
  updateLikes,
  getCategories
} from "../controller/shayari.controller.js";

const router = Router();

// GET all shayaris with pagination and filtering
// Example: /api/shayari?page=1&limit=10&category=ISHQ&search=dil
router.get("/", getShayaris);

// GET all categories with counts
router.get("/categories", getCategories);

// POST a new shayari
router.post("/", addShayaris);

// DELETE a shayari
router.delete("/:id", deleteShayaris);

// PATCH (Edit) a shayari
router.put("/:id", editShayaris);

// Update likes for a shayari
router.post("/:id/likes", updateLikes);

export default router;
