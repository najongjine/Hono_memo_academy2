"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// serve 라는 객체든, 함수든 뭐 요렇게 된놈을 가져와라
// @hono/node-server 라는 모듈 덩어리에서
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const dotenv = __importStar(require("dotenv"));
const test1_js_1 = __importDefault(require("./router/test1.js"));
const dbtest_js_1 = __importDefault(require("./router/dbtest/dbtest.js"));
const auth_js_1 = __importDefault(require("./router/auth/auth.js"));
const memo_js_1 = __importDefault(require("./router/memo/memo.js"));
// app 이라는 객체를 만들어라. Hono 라는 클래스를 통해서
// 클래스란건 어떻게 알음?? new 키워드 보고 눈치챔
const app = new hono_1.Hono();
// .env.development 읽을건지, .env.production 읽을건지 결정
const envFile = process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });
app.use("*", (0, cors_1.cors)({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["*"],
}));
// get은 영어의 뜻에선 가져오다. 근데, 이게 http 이론에서도 등장
// endpoint도 있다 "/"
// 또 테스트도 해보고, "아... 이게 api endpoint구나" 이렇게 아는것
app.get("/", (c) => {
    return c.text(`${__dirname}`);
});
app.route("/test1", test1_js_1.default);
app.route("/dbtest", dbtest_js_1.default);
app.route("/api/auth", auth_js_1.default);
app.route("/api/memo", memo_js_1.default);
/** 이건 코드가 드럽게 어렵게 생김
 * port:3000, console.log(`Server is running on http://localhost:${info.port}`);
 * 이걸 보고, 서버 돌리는 코드구나 하고 알게됨
 * 봐도 정 모르겠으면, gpt 한테 물어봄
 *
 * (info) => { 요건 콜백 함수인데, 지금 이 코드에서 뜻은
 * serve 함수 실행하고나면 (info) => { 요 함수를 갔다 써라. 니가 쓰고싶을때
 * 맘대로
 */
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 3001,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
