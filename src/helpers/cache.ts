import express, { Request, Response } from 'express';
import cache from 'memory-cache';

const app = express();

app.get('/users', (req: Request, res: Response) => {
    const cacheKey = 'usersData';

    // Check if data exists in the cache
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        // Serve the data from cache
        res.json(cachedData);
    } else {
        // If data doesn't exist in cache, fetch it from the database or perform expensive operations
        const users = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
        ];

        // Store the data in cache for 5 minutes (300 seconds)
        cache.put(cacheKey, users, 300 * 1000);

        // Send the response
        res.json(users);
    }
});
