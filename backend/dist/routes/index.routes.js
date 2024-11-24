"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = require("../controller/index.controller");
const routes = express_1.default.Router();
// [PROGRAM] ROUTES
routes.post("/add-program", index_controller_1.HandleAddProgramController);
routes.post("/program-detail", index_controller_1.HandleViewDetailProgramController);
routes.get("/view-programs", index_controller_1.HandleViewProgramsController);
//[CATEGORY] ROUTES
routes.post("/add-category", index_controller_1.HandleAddCategoryController);
routes.post("/category-detail", index_controller_1.HandleViewDetailCategoryController);
routes.get("/view-categories", index_controller_1.HandleViewCategoriesController);
//[SUBCATEGORY] ROUTES
routes.post("/add-subcategory", index_controller_1.HandleAddSubCategoryController);
exports.default = routes;
