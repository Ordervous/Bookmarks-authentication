import { RequestHandler } from "express";
import { Bookmark } from "../models/bookmark";

export const allBookmarks: RequestHandler = async (req, res, next) => {
    let bookmarks: Bookmark[] = await Bookmark.findAll();
    res.render('bookmark-list', { bookmarks, user: req.user });
}

export const addBookmark: RequestHandler = async (req, res, next) => {
    let newBookmark: Bookmark = req.body;
    if (newBookmark.title && newBookmark.url) {
        await Bookmark.create(newBookmark);
        res.redirect('/bookmarks');
    } else {
        res.status(400).render('error', { message: 'Invalid Bookmark data provided' });
    }
}

export const deleteBookmark: RequestHandler = async (req, res, next) => {
    let itemId = req.params.bookmarkId;

    let deleted = await Bookmark.destroy({
        where: { bookmarkId: itemId }
    });

    if (deleted) {
        res.redirect('/bookmarks')
    }
    else {
        res.status(404).render('error', { message: 'Cannot find item' });
    }
}