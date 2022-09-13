"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookmark = exports.addBookmark = exports.allBookmarks = void 0;
const bookmark_1 = require("../models/bookmark");
const allBookmarks = async (req, res, next) => {
    let bookmarks = await bookmark_1.Bookmark.findAll();
    res.render('bookmark-list', { bookmarks, user: req.user });
};
exports.allBookmarks = allBookmarks;
const addBookmark = async (req, res, next) => {
    let newBookmark = req.body;
    if (newBookmark.title && newBookmark.url) {
        await bookmark_1.Bookmark.create(newBookmark);
        res.redirect('/bookmarks');
    }
    else {
        res.status(400).render('error', { message: 'Invalid Bookmark data provided' });
    }
};
exports.addBookmark = addBookmark;
const deleteBookmark = async (req, res, next) => {
    let itemId = req.params.bookmarkId;
    let deleted = await bookmark_1.Bookmark.destroy({
        where: { bookmarkId: itemId }
    });
    if (deleted) {
        res.redirect('/bookmarks');
    }
    else {
        res.status(404).render('error', { message: 'Cannot find item' });
    }
};
exports.deleteBookmark = deleteBookmark;
