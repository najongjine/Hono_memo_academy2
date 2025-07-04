"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.generateToken = exports.decryptData = exports.encryptData = exports.comparePassword = exports.hashPassword = void 0;
/**
npm install hono jsonwebtoken bcrypt
npm install -D typescript ts-node @types/node @types/jsonwebtoken @types/bcrypt
 */
//@ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
//@ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//@ts-ignore
const crypto_1 = __importDefault(require("crypto"));
const JWT_SECRET = String(process.env.JWT_SECRET);
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your_32_byte_encryption_key_123456"; // 32 bytes
const IV_LENGTH = 16; // AES block size
// 단방향 암호화: 비밀번호 해시 생성
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
// 단방향 암호화: 비밀번호 검증
const comparePassword = async (password, hash) => {
    return await bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
// 양방향 암호화: 데이터 암호화
const encryptData = (data) => {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};
exports.encryptData = encryptData;
// 양방향 암호화: 데이터 복호화
const decryptData = (encryptedData) => {
    const parts = encryptedData.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = Buffer.from(parts[1], "hex");
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
exports.decryptData = decryptData;
// JWT 생성
const generateToken = (payload, expiresIn = "1h") => {
    //@ts-ignore
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
};
exports.generateToken = generateToken;
// JWT 검증
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
// JWT 해독 (검증 없이 페이로드만 추출)
const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1];
        const decoded = Buffer.from(payload, "base64").toString("utf-8");
        return JSON.parse(decoded);
    }
    catch (error) {
        return null;
    }
};
exports.decodeToken = decodeToken;
