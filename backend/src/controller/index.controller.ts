import { NextFunction } from "express";
import {
  IdRequestBody,
  IdRequestType,
  NewProgramSchema,
  NewProgramType,
  NewSubCategorySchema,
  NewSubcategoryType,
  SaveProgramSchema,
  SaveProgramType,
} from "../types/index.types";
import { ErrorHandler } from "../utils/ErrorHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ADD PROGRAM
export const HandleAddProgramController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const requestBody: NewProgramType = req.body;
    const valid = NewProgramSchema.safeParse(requestBody);
    if (!valid.success) {
      return next(
        ErrorHandler(
          400,
          "Required fields are not provided or are incorrect, please check"
        )
      );
    }
    const data = await prisma.program.create({
      data: {
        name: requestBody.name,
        combo: false,
      },
    });
    if (!data) {
      return next(
        ErrorHandler(400, "Something went wrong while adding program")
      );
    }
    return res
      .status(201)
      .json({ success: true, message: "Program Created", data });
  } catch (error) {
    return next(error);
  }
};

//VIEW PROGRAMS
export const HandleViewProgramsController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const data = await prisma.program.findMany({
      select: { name: true, id: true },
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

//VIEW DETAILED PROGRAM
export const HandleViewDetailProgramController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const requestBody: IdRequestType = req.body;
    const validate = IdRequestBody.safeParse(requestBody);
    if (!validate.success) {
      return next(ErrorHandler(400, "Valid details are not provided"));
    }
    const data = await prisma.program.findFirst({
      where: { id: requestBody.id },
      include: { exercises: true },
    });
    if (!data) {
      return next(
        ErrorHandler(500, "Something went wrong while fetching program details")
      );
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};
//DELETE PROGRAM
export const HandleDeleteProgramController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const requestBody: IdRequestType = req.body;
    const validate = IdRequestBody.safeParse(requestBody);
    if (!validate.success) {
      return next(ErrorHandler(400, "Id not provided correctly"));
    }
    await prisma.program.delete({ where: { id: requestBody.id } });
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};
//!CATEGORY
//ADD CATEGORY
export const HandleAddCategoryController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const requestBody: NewProgramType = req.body;
    const validate = NewProgramSchema.safeParse(requestBody);
    if (!validate.success) {
      return next(ErrorHandler(400, "Required Fields Are Not Provided"));
    }
    const data = await prisma.category.create({
      data: {
        name: requestBody.name,
      },
    });
    if (!data) {
      return next(
        ErrorHandler(400, "Something went wrong while adding program")
      );
    }
    return res
      .status(201)
      .json({ success: true, message: "Program Created", data });
  } catch (error) {
    return next(error);
  }
};
//ADD CATEGORIES
export const HandleViewCategoriesController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const data = await prisma.category.findMany({
      select: { name: true, id: true, subcategories: true },
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};
//VIEW DETAILED PROGRAM
export const HandleViewDetailCategoryController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const requestBody: IdRequestType = req.body;
    const validate = IdRequestBody.safeParse(requestBody);
    if (!validate.success) {
      return next(ErrorHandler(400, "Valid details are not provided"));
    }
    const data = await prisma.category.findFirst({
      where: { id: Number(requestBody.id) },
      include: {
        subcategories: true,
      },
    });
    if (!data) {
      return next(
        ErrorHandler(500, "Something went wrong while fetching program details")
      );
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

//!SUBCATEGORY
//ADD SUBCATEGORY
export const HandleAddSubCategoryController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const requestBody: NewSubcategoryType = req.body;
    const validate = NewSubCategorySchema.safeParse(requestBody);
    if (!validate.success) {
      return next(ErrorHandler(400, "Required fields are not provided"));
    }
    const data = await prisma.subcategory.create({
      data: {
        name: requestBody.name,
        exercises: requestBody.exercises,
        category: { connect: { id: requestBody.cid } },
      },
    });
    if (!data) {
      return next(
        ErrorHandler(
          400,
          "Something went wrong while adding category to database"
        )
      );
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};
//GET COMBO PROGRAMS
export const HandleGetComboProgramsController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const data = await prisma.program.findMany({
      where: { combo: true },
      include: { exercises: true },
    });
    if (!data) {
      return next(
        ErrorHandler(500, "Something went wrong while getting the programs")
      );
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};
//! SAVE PROGRAM CONTROLLER
export const HandleSaveProgramController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const requestBody: SaveProgramType = req.body;
    const validate = SaveProgramSchema.safeParse(requestBody);

    if (!validate.success) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields not provided" });
    }

    if (requestBody.exercises.length === 0) {
      return next(ErrorHandler(400, "Must Have at least one exercise"));
    }

    // Create exercises
    const createdExercises = [];
    for (const exercise of requestBody.exercises) {
      const createdExercise = await prisma.exercises.create({
        data: {
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          holdTime: exercise.holdTime,
          description: exercise.description,
          side: exercise.side,
          pid: exercise.pid,
        },
      });
      createdExercises.push({ id: createdExercise.id }); // Collect the created exercise IDs
    }

    // Update the program
    await prisma.program.update({
      where: { id: requestBody.id },
      data: {
        combo: requestBody.combo,
        exercises: {
          connect: createdExercises, // Use the correct variable
        },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Program and Exercises Saved" });
  } catch (error) {
    return next(error);
  }
};
