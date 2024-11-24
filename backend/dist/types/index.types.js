"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramSchema = exports.IdRequestBody = exports.NewProgramSchema = void 0;
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
