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
exports.HandleViewDetailCategoryController = exports.HandleViewCategoriesController = exports.HandleAddCategoryController = exports.HandleViewDetailProgramController = exports.HandleViewProgramsController = exports.HandleAddProgramController = void 0;
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
            select: { name: true, id: true },
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
            where: { id: requestBody.id },
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
