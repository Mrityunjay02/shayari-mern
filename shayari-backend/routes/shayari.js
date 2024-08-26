import { Router } from "express";
import {
  addShayaris,
  deleteShayaris,
  getShayaris,
  editShayaris,

} from "../controller/shayari.controller.js";
import { loginUser, register } from "../controller/auth.controller.js"; // Import authentication controller

const router = Router();

// GET all shayaris
router.get("/getShayari", getShayaris);

// POST a new shayari
router.post("/addShayari", addShayaris);

// DELETE a shayari
router.delete("/deleteShayari/:id", deleteShayaris);

// PATCH (Edit) a shayari
router.put("/editShayari/:id", editShayaris);

// POST login
router.post("/login", loginUser);
router.post("/register", register);


export default router;
