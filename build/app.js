"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const bookmarkRoutes_1 = __importDefault(require("./routes/bookmarkRoutes"));
const models_1 = require("./models");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const bookmarkController_1 = require("./controllers/bookmarkController");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
// Setting our view engine as Handlebars
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, "../src/views"));
app.set('view options', { layout: 'layout' });
// Passport/Session middleware
app.use((0, express_session_1.default)({ secret: 'everyone loves a mandarin slinky' }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/bookmarks', bookmarkRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/', bookmarkController_1.allBookmarks);
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
});
// Syncing our database
models_1.db.sync().then(() => {
    console.info("connected to the database!");
});
app.listen(3000);
