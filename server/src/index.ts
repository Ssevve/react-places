import apicache from 'apicache';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { getBusinesses } from './controllers/businesses';
import { getCities } from './controllers/cities';
import { validate } from './middleware/validate';
import { getBusinessesValidationSchema } from './schemas/getBusinessesValidationSchema';
import { getCitiesValidationSchema } from './schemas/getCitiesValidationSchema';

const app = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the react-places API!',
  });
});

const cache = apicache.middleware;

app.get('/businesses', validate(getBusinessesValidationSchema), cache('12 hours'), getBusinesses);
app.get('/cities', validate(getCitiesValidationSchema), cache('12 hours'), getCities);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

export default app;
