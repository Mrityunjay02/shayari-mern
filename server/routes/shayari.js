import { Router } from "express";
import {
  addShayaris,
  deleteShayaris,
  getShayaris,
  editShayaris,
} from "../controller/shayari.controller.js";

const router = Router();

// GET all shayaris with pagination
// Example: /api/shayari?page=1&limit=10
router.get("/", getShayaris);

// POST a new shayari
router.post("/", addShayaris);

// DELETE a shayari
router.delete("/:id", deleteShayaris);

// PATCH (Edit) a shayari
router.put("/:id", editShayaris);

export default router;
