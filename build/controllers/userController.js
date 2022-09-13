"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.loginUserPage = exports.registerUser = exports.registerUserPage = void 0;
const user_1 = require("../models/user");
const registerUserPage = (req, res, next) => {
    res.render('register');
};
exports.registerUserPage = registerUserPage;
const registerUser = async (req, res, next) => {
    let newUser = req.body;
    let created = await user_1.User.create(newUser);
    console.log('User created', created);
    res.redirect('/user/login');
    // res.redirect('/bookmarks');
};
exports.registerUser = registerUser;
const loginUserPage = (req, res, next) => {
    res.render('login');
};
exports.loginUserPage = loginUserPage;
const loginUser = async (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        res.render('bookmark-list', { user: req.user });
        res.redirect('/bookmarks');
    }
    else {
        res.redirect('/user/login');
    }
};
exports.loginUser = loginUser;
