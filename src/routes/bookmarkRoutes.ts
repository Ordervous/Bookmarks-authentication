import { Router } from 'express';
import { addBookmark, allBookmarks, deleteBookmark } from '../controllers/bookmarkController';

const router = Router();

// GET /bookmarks - renders a list of bookmarks
router.get('/', allBookmarks);
router.get('/user/login', allBookmarks)

// POST /bookmarks/add - add new bookmark
router.post('/add', addBookmark);

// POST /bookmarks/delete/:bookmarkId - delete bookmark
router.post('/delete/:bookmarkId', deleteBookmark);

export default router;