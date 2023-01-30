import { Express } from 'express';
import express from 'express';
import config from './config/config';
import { exit } from 'process';
import db from './config/db';
import cors from 'cors';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

(async () => {
	try {
		await db.connect();
		console.log('Connected to database');
	} catch (error) {
		console.log('failed to connect to database', error);
		exit(1);
	}
})();

app.listen(config.httpPort, () => {
	console.log(`Listening for requests on port ${config.httpPort}`);
});
