"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const connect_slashes_1 = __importDefault(require("connect-slashes"));
require('dotenv').config();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';
const app = next_1.default({
    dev: isProd,
    dir: './src',
});
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = express_1.default();
    server
        .use([compression_1.default(), connect_slashes_1.default()])
        .get('/*', async (req, res) => {
        if (!req.path.startsWith('/_next/') && !req.path.startsWith('/static/')) {
            app.render(req, res, '/', {
                isProd,
            });
        }
        else {
            handle(req, res);
        }
    })
        // @ts-ignore
        .listen(port, (err) => {
        if (err)
            throw err;
        // eslint-disable-next-line no-console
        console.info(`> Ready on http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map