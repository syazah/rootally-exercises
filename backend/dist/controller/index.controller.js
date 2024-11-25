"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleSaveProgramController = exports.HandleGetComboProgramsController = exports.HandleAddSubCategoryController = exports.HandleViewDetailCategoryController = exports.HandleViewCategoriesController = exports.HandleAddCategoryController = exports.HandleDeleteProgramController = exports.HandleViewDetailProgramController = exports.HandleViewProgramsController = exports.HandleAddProgramController = void 0;
const index_types_1 = require("../types/index.types");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ADD PROGRAM
const HandleAddProgramController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const valid = index_types_1.NewProgramSchema.safeParse(requestBody);
        if (!valid.success) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Required fields are not provided or are incorrect, please check"));
        }
        const data = yield prisma.program.create({
            data: {
                name: requestBody.name,
                combo: false,
            },
        });
        if (!data) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Something went wrong while adding program"));
        }
        return res
            .status(201)
            .json({ success: true, message: "Program Created", data });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleAddProgramController = HandleAddProgramController;
//VIEW PROGRAMS
const HandleViewProgramsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.program.findMany({
            select: { name: true, id: true },
        });
        return res.status(200).json({ success: true, data });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleViewProgramsController = HandleViewProgramsController;
//VIEW DETAILED PROGRAM
const HandleViewDetailProgramController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const validate = index_types_1.IdRequestBody.safeParse(requestBody);
        if (!validate.success) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Valid details are not provided"));
        }
        const data = yield prisma.program.findFirst({
            where: { id: requestBody.id },
            include: { exercises: true },
        });
        if (!data) {
            return next((0, ErrorHandler_1.ErrorHandler)(500, "Something went wrong while fetching program details"));
        }
        return res.status(200).json({ success: true, data });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleViewDetailProgramController = HandleViewDetailProgramController;
//DELETE PROGRAM
const HandleDeleteProgramController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const validate = index_types_1.IdRequestBody.safeParse(requestBody);
        if (!validate.success) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Id not provided correctly"));
        }
        yield prisma.program.delete({ where: { id: requestBody.id } });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleDeleteProgramController = HandleDeleteProgramController;
//!CATEGORY
//ADD CATEGORY
const HandleAddCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const validate = index_types_1.NewProgramSchema.safeParse(requestBody);
        if (!validate.success) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Required Fields Are Not Provided"));
        }
        const data = yield prisma.category.create({
            data: {
                name: requestBody.name,
            },
        });
        if (!data) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Something went wrong while adding program"));
        }
        return res
            .status(201)
            .json({ success: true, message: "Program Created", data });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleAddCategoryController = HandleAddCategoryController;
//ADD CATEGORIES
const HandleViewCategoriesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.category.findMany({
            select: { name: true, id: true, subcategories: true },
        });
        return res.status(200).json({ success: true, data });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleViewCategoriesController = HandleViewCategoriesController;
//VIEW DETAILED PROGRAM
const HandleViewDetailCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const validate = index_types_1.IdRequestBody.safeParse(requestBody);
        if (!validate.success) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Valid details are not provided"));
        }
        const data = yield prisma.category.findFirst({
            where: { id: Number(requestBody.id) },
            include: {
                subcategories: true,
            },
        });
        if (!data) {
            return next((0, ErrorHandler_1.ErrorHandler)(500, "Something went wrong while fetching program details"));
        }
        return res.status(200).json({ success: true, data });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleViewDetailCategoryController = HandleViewDetailCategoryController;
//!SUBCATEGORY
//ADD SUBCATEGORY
const HandleAddSubCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const validate = index_types_1.NewSubCategorySchema.safeParse(requestBody);
        if (!validate.success) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Required fields are not provided"));
        }
        const data = yield prisma.subcategory.create({
            data: {
                name: requestBody.name,
                exercises: requestBody.exercises,
                category: { connect: { id: requestBody.cid } },
            },
        });
        if (!data) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Something went wrong while adding category to database"));
        }
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleAddSubCategoryController = HandleAddSubCategoryController;
//GET COMBO PROGRAMS
const HandleGetComboProgramsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.program.findMany({
            where: { combo: true },
            include: { exercises: true },
        });
        if (!data) {
            return next((0, ErrorHandler_1.ErrorHandler)(500, "Something went wrong while getting the programs"));
        }
        return res.status(200).json({ success: true, data });
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleGetComboProgramsController = HandleGetComboProgramsController;
//! SAVE PROGRAM CONTROLLER
const HandleSaveProgramController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const validate = index_types_1.SaveProgramSchema.safeParse(requestBody);
        if (!validate.success) {
            return res
                .status(400)
                .json({ success: false, message: "Required fields not provided" });
        }
        if (requestBody.exercises.length === 0) {
            return next((0, ErrorHandler_1.ErrorHandler)(400, "Must Have at least one exercise"));
        }
        // Create exercises
        const createdExercises = [];
        for (const exercise of requestBody.exercises) {
            const createdExercise = yield prisma.exercises.create({
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
        yield prisma.program.update({
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
    }
    catch (error) {
        return next(error);
    }
});
exports.HandleSaveProgramController = HandleSaveProgramController;
