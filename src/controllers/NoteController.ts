import { Request, Response } from "express";
import NoteModel from "../models/NoteModel";
import { logger, errorLogger } from "../configs/logger";
import {
  CreateNoteInput,
  FilterQueryInput,
  ParamsInput,
  UpdateNoteInput,
} from "../validate/noteValidate";

class noteController {
  static createNoteController = async (
    req: Request<{}, {}, CreateNoteInput>,
    res: Response
  ) => {
    try {
      const { title, content, category, published } = req.body;

      const note = await NoteModel.create({
        title,
        content,
        category,
        published,
      });
      logger.info(note);
      res.status(201).json({
        status: "success",
        data: {
          note,
        },
      });
    } catch (error: any) {
      errorLogger.error(error);
      if (error.name === "SequelizeUniqueConstraintError") {
        errorLogger.error("Note with that title already exists");

        return res.status(409).json({
          status: "failed",
          message: "Note with that title already exists",
        });
      }

      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static updateNoteController = async (
    req: Request<UpdateNoteInput["params"], {}, UpdateNoteInput["body"]>,
    res: Response
  ) => {
    try {
      const result = await NoteModel.update(
        { ...req.body, updatedAt: Date.now() },
        {
          where: {
            id: req.params.noteId,
          },
        }
      );

      if (result[0] === 0) {
        errorLogger.error("Note with that ID not found");
        return res.status(404).json({
          status: "fail",
          message: "Note with that ID not found",
        });
      }

      const note = await NoteModel.findByPk(req.params.noteId);
      logger.info(note);

      res.status(200).json({
        status: "success",
        data: {
          note,
        },
      });
    } catch (error: any) {
      errorLogger.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static findNoteController = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      const note = await NoteModel.findByPk(req.params.noteId);

      if (!note) {
        errorLogger.error("Note with that ID not found");
        return res.status(404).json({
          status: "fail",
          message: "Note with that ID not found",
        });
      }
      logger.info(note);
      res.status(200).json({
        status: "success",
        data: {
          note,
        },
      });
    } catch (error: any) {
      errorLogger.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static findAllNotesController = async (
    req: Request<{}, {}, {}, FilterQueryInput>,
    res: Response
  ) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1) * limit;

      const notes = await NoteModel.findAll({ limit, offset: skip });
      logger.info(notes);
      res.status(200).json({
        status: "success",
        results: notes.length,
        notes,
      });
    } catch (error: any) {
      errorLogger.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static deleteNoteController = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      const result = await NoteModel.destroy({
        where: { id: req.params.noteId },
        force: true,
      });

      if (result === 0) {
        errorLogger.error("Note with that ID not found");
        return res.status(404).json({
          status: "fail",
          message: "Note with that ID not found",
        });
      }

      res.status(204).json();
    } catch (error: any) {
      errorLogger.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

export default noteController;
