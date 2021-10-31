import express, { Request } from 'express';
import 'dotenv/config';

import validFlow from 'flowValidator';

const createServer = () => {
  const port = process.env.DATA_HANDLER_PORT;

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post('/flow', (req: Request) => {
    const body = req.body as string;

    if (validFlow(body)) {
      // post to mongo
    }
  });

  return app.listen(port, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`DJG Data Handler listening on port: ${port}`);
  });
};

export default createServer;
