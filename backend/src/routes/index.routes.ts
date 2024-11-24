import express from "express";
import {
  HandleAddCategoryController,
  HandleAddProgramController,
  HandleViewCategoriesController,
  HandleViewDetailCategoryController,
  HandleViewDetailProgramController,
  HandleViewProgramsController,
} from "../controller/index.controller";

const routes = express.Router();

// [PROGRAM] ROUTES
routes.post("/add-program", HandleAddProgramController);
routes.post("/program-detail", HandleViewDetailProgramController);
routes.get("/view-programs", HandleViewProgramsController);

//[CATEGORY] ROUTES
routes.post("/add-category", HandleAddCategoryController);
routes.post("/category-detail", HandleViewDetailCategoryController);
routes.get("/view-categories", HandleViewCategoriesController);

//[SUBCATEGORY] ROUTES
routes.post("add-subcategory", HandleAddSubCategoryController)

export default routes;
