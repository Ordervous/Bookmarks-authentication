import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import path from 'path';
import bookmarkRoutes from './routes/bookmarkRoutes';
import { db } from './models';
import passport from 'passport';
import session from 'express-session';
import { allBookmarks } from './controllers/bookmarkController';
import userRoutes from './routes/userRoutes'

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../src/public')));

// Setting our view engine as Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../src/views"));
app.set('view options', {layout: 'layout'});

// Passport/Session middleware
app.use(session({ secret: 'everyone loves a mandarin slinky' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/bookmarks', bookmarkRoutes);
app.use('/user', userRoutes);
app.use('/', allBookmarks);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3000);