import express, { Request } from 'express';
import 'dotenv/config';

import { Flow, Alert } from 'validators/validator';
import { validFlow } from 'validators/flowValidator';
import { validAlert } from 'validators/alertValidator';

const createServer = () => {
  const port = process.env.DATA_HANDLER_PORT;

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post('/flow', (req: Request) => {
    const flow = req.body as Flow;

    if (validFlow(flow)) {
      // post to mongo
    }
  });

  app.post('/alert', (req: Request) => {
    const alert = req.body as Alert;

    if (validAlert(alert)) {
      // post to mongo
    }
  });

  return app.listen(port, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`DJG Data Handler listening on port: ${port}`);
  });
};

export { createServer };
