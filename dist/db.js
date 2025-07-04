"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = void 0;
const serverless_1 = require("@neondatabase/serverless");
exports.sql = (0, serverless_1.neon)("postgres://neondb_owner:npg_UI5fz8xamDRX@ep-summer-cloud-a4fprrii-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");
