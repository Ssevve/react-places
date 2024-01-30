import apicache from 'apicache';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { getCities } from './controllers';
import { validate } from './middleware';
import { yelpRoutes } from './routes';
import { getCitiesValidationSchema } from './schemas';

const app = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello',
  });
});

const cache = apicache.middleware;

app.use('/yelp', cache('12 hours'), yelpRoutes);
app.get('/cities', validate(getCitiesValidationSchema), cache('12 hours'), getCities);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

export default app;
