import { z } from "zod";
// PROGRAM SCHEMA
const ProgramSchema = z.object({
  id: z.number(),
  name: z.string(),
  categories: z.array(z.object({}).passthrough()).optional(),
  exercises: z.array(z.object({}).passthrough()).optional(),
});
type ProgramType = z.infer<typeof ProgramSchema>;
//NEW PROGRAM
const NewProgramSchema = z.object({
  name: z.string(),
});
type NewProgramType = z.infer<typeof NewProgramSchema>;
//ID
const IdRequestBody = z.object({
  id: z.number(),
});
type IdRequestType = z.infer<typeof IdRequestBody>;
//SUBCATEGORY REQUEST
const NewSubCategorySchema = z.object({
  name: z.string(),
  cid: z.number(),
  exercises: z.array(z.string()),
});
type NewSubcategoryType = z.infer<typeof NewSubCategorySchema>;

//EXERCISE
const ExerciseSchema = z.object({
  name: z.string(),
  sets: z.number().optional(),
  reps: z.number().optional(),
  holdTime: z.number(),
  description: z.string().optional(),
  side: z.enum(["LEFT", "RIGHT", "BOTH"]),
  pid: z.number(),
});
//SAVE PROGRAM
const SaveProgramSchema = z.object({
  id: z.number(),
  exercises: z.array(ExerciseSchema),
  combo: z.boolean(),
});
type SaveProgramType = z.infer<typeof SaveProgramSchema>;
export {
  NewProgramSchema,
  NewProgramType,
  IdRequestBody,
  IdRequestType,
  ProgramSchema,
  ProgramType,
  NewSubCategorySchema,
  NewSubcategoryType,
  SaveProgramSchema,
  SaveProgramType,
};
