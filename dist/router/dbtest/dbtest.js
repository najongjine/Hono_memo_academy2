"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const db_js_1 = require("../../db.js");
const router = new hono_1.Hono();
/**
 * GET /t_dummy1
 * SELECT * FROM t_dummy1 LIMIT 1000
 */
router.get("/t_dummy1", async (c) => {
    try {
        let ddd = c.req.query("ddd");
        let a = c.req.query("a");
        const dummy1data = await (0, db_js_1.sql) `
      SELECT *
      FROM t_dummy1
      LIMIT 1000
    `;
        return c.json({ dummy1data });
    }
    catch (error) {
        return c.json(error?.message ?? "Unknown error");
    }
});
/**
 * GET /t_dummy2
 * SELECT * FROM t_user
 */
router.get("/t_dummy2", async (c) => {
    try {
        let ddd = c.req.query("ddd");
        let a = c.req.query("a");
        const data = await (0, db_js_1.sql) `
      SELECT *
      FROM t_user
    `;
        return c.json({ data });
    }
    catch (error) {
        return c.json(error?.message ?? "Unknown error");
    }
});
/**
 * POST /body
 * INSERT INTO t_dummy1 (name) VALUES ($1)
 * RETURNING *
 */
router.post("/body", async (c) => {
    try {
        const body = await c.req.json();
        let name = body?.name ?? "";
        const [newDummy] = await (0, db_js_1.sql) `
      INSERT INTO t_dummy1 (name)
      VALUES (${name})
      RETURNING *
    `;
        return c.json({ newDummy });
    }
    catch (error) {
        return c.json(error?.message ?? "Unknown error");
    }
});
exports.default = router;
