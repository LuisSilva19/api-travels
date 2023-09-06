import express from "express";
import { validate } from "../middleware/validate";
import noteController from "../controllers/NoteController";
import { createNoteSchema, updateNoteSchema } from "../validate/noteValidate";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: notes
 *   description: Rotas para gerenciamento de notas.
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags: [notes]
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/notes", noteController.findAllNotesController);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     tags: [notes]
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/notes", validate(createNoteSchema), noteController.createNoteController);

/**
 * @swagger
 * /notes/{noteId}:
 *   get:
 *     summary: Get a note by ID
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note
 *     tags: [notes]
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Note not found
 */
router.get("/notes/:noteId", noteController.findNoteController);

/**
 * @swagger
 * /notes/{noteId}:
 *   patch:
 *     summary: Update a note by ID
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     tags: [notes]
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Note not found
 */
router.patch("/notes/:noteId", validate(updateNoteSchema), noteController.updateNoteController);

/**
 * @swagger
 * /notes/{noteId}:
 *   delete:
 *     summary: Delete a note by ID
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note
 *     tags: [notes]
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Note not found
 */
router.delete("/notes/:noteId", noteController.deleteNoteController);

export default router;
