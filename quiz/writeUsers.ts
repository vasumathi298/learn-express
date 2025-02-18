import express, { Response } from 'express';
import path from 'path';
import fs from 'fs';
import { User, UserRequest } from './types';

const router = express.Router();
const dataFile = '../data/users.json';
let users: User[];

// Load users from JSON file
fs.readFile(path.resolve(__dirname, dataFile), (err, data) => {
    if (err) throw err;
    users = JSON.parse(data.toString());
});

// Add new user
router.post('/adduser', (req: UserRequest, res: Response) => {
    const newUser = req.body as User;
    users.push(newUser);

    fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(users), (err) => {
        if (err) {
            console.error('Failed to write user data');
            res.status(500).send('Error saving user');
        } else {
            console.log('User saved');
            res.send('User added successfully');
        }
    });
});

export default router;