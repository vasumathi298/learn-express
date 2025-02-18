import express, { Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { User, UserRequest } from './types';

const router = express.Router();
const dataFile = '../data/users.json';
let users: User[];

// Middleware to load users from JSON file and add users to the request object
const loadUsers = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const data = await fs.promises.readFile(path.resolve(__dirname, dataFile));
        users = JSON.parse(data.toString()); // Always reload the data
        req.users = users;
        console.log('Users reloaded');
        next();
    } catch (error) {
        console.error('Failed to load users:', error);
        res.status(500).json({ error: 'Failed to load users' });
    }
};


// Get all usernames
router.get('/usernames', loadUsers, (req: UserRequest, res: Response) => {
    const usernames = req.users?.map((user) => ({
        id: user.id,
        username: user.username,
    }));
    res.json(usernames);
});

// Get user email by username
router.get('/username/:name', loadUsers, (req: UserRequest, res: Response) => {
    const name = req.params.name;
    const user = users.find((user) => user.username === name);

    if (user) {
        res.json({ email: user.email });
    } else {
        res.status(404).send('User not found');
    }
});

export default router;