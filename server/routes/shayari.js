import { Router } from "express";
import {
  addShayaris,
  deleteShayaris,
  getShayaris,
  editShayaris,

} from "../controller/shayari.controller.js";
import { loginUser, register } from "../controller/auth.controller.js"; // Import authentication controller

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

// Authentication routes
router.post("/auth/login", loginUser);
router.post("/auth/register", register);


export default router;
