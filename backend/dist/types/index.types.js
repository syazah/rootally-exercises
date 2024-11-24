"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveProgramSchema = exports.NewSubCategorySchema = exports.ProgramSchema = exports.IdRequestBody = exports.NewProgramSchema = void 0;
const zod_1 = require("zod");
// PROGRAM SCHEMA
const ProgramSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    categories: zod_1.z.array(zod_1.z.object({}).passthrough()).optional(),
    exercises: zod_1.z.array(zod_1.z.object({}).passthrough()).optional(),
});
exports.ProgramSchema = ProgramSchema;
//NEW PROGRAM
const NewProgramSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.NewProgramSchema = NewProgramSchema;
//ID
const IdRequestBody = zod_1.z.object({
    id: zod_1.z.number(),
});
exports.IdRequestBody = IdRequestBody;
//SUBCATEGORY REQUEST
const NewSubCategorySchema = zod_1.z.object({
    name: zod_1.z.string(),
    cid: zod_1.z.number(),
    exercises: zod_1.z.array(zod_1.z.string()),
});
exports.NewSubCategorySchema = NewSubCategorySchema;
//EXERCISE
const ExerciseSchema = zod_1.z.object({
    name: zod_1.z.string(),
    sets: zod_1.z.number().optional(),
    reps: zod_1.z.number().optional(),
    holdTime: zod_1.z.number(),
    description: zod_1.z.string().optional(),
    side: zod_1.z.enum(["LEFT", "RIGHT", "BOTH"]),
    pid: zod_1.z.number(),
});
//SAVE PROGRAM
const SaveProgramSchema = zod_1.z.object({
    id: zod_1.z.number(),
    exercises: zod_1.z.array(ExerciseSchema),
    combo: zod_1.z.boolean(),
});
exports.SaveProgramSchema = SaveProgramSchema;
