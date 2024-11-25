import express from "express";
import {
  HandleAddCategoryController,
  HandleAddProgramController,
  HandleAddSubCategoryController,
  HandleDeleteProgramController,
  HandleGetComboProgramsController,
  HandleSaveProgramController,
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
routes.delete("/delete-program", HandleDeleteProgramController)

//[CATEGORY] ROUTES
routes.post("/add-category", HandleAddCategoryController);
routes.post("/category-detail", HandleViewDetailCategoryController);
routes.get("/view-categories", HandleViewCategoriesController);

//[SUBCATEGORY] ROUTES
routes.post("/add-subcategory", HandleAddSubCategoryController);
//GET COMBO
routes.get("/combos", HandleGetComboProgramsController);

//ADD PROGRAM
routes.post("/save-program", HandleSaveProgramController);

export default routes;
