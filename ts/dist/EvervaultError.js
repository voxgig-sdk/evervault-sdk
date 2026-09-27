"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvervaultError = void 0;
class EvervaultError extends Error {
    isEvervaultError = true;
    sdk = 'Evervault';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.EvervaultError = EvervaultError;
//# sourceMappingURL=EvervaultError.js.map