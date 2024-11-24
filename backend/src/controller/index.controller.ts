import { NextFunction } from "express";
import {
  IdRequestBody,
  IdRequestType,
  NewProgramSchema,
  NewProgramType,
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
      select: { name: true, id: true },
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
      where: { id: requestBody.id },
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
    const requestBody = req.body;
    
  } catch (error) {
    return next(error);
  }
};
