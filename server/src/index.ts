import apicache from 'apicache';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { yelpRoutes } from './routes';
import { getCities } from './controllers/cities';

const app = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello',
  });
});

const cache = apicache.middleware;

app.use('/yelp', cache('12 hours'), yelpRoutes);
app.get('/cities', cache('12 hours'), getCities);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

export default app;
