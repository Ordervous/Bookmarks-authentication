"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmarkController_1 = require("../controllers/bookmarkController");
const router = (0, express_1.Router)();
// GET /bookmarks - renders a list of bookmarks
router.get('/', bookmarkController_1.allBookmarks);
router.get('/user/login', bookmarkController_1.allBookmarks);
// POST /bookmarks/add - add new bookmark
router.post('/add', bookmarkController_1.addBookmark);
// POST /bookmarks/delete/:bookmarkId - delete bookmark
router.post('/delete/:bookmarkId', bookmarkController_1.deleteBookmark);
exports.default = router;
