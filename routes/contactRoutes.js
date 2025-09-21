import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact/submit
router.post('/submit', submitContactForm);

export default router;
