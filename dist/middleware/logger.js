"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map