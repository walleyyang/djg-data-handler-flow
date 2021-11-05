import express, { Request, Response } from 'express';
import 'dotenv/config';

import { Flow, Alert } from 'common/models';
// import { validFlow } from 'validators/flowValidator';
// import { validAlert } from 'validators/alertValidator';

const createServer = () => {
  const port = process.env.DATA_HANDLER_PORT || '';

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post('/flow', (req: Request) => {
    const flow = req.body as Flow;

    // filter

    // if (validFlow(flow)) {
    //   // post to mongo
    //   handleFlow(flow);
    // }
  });

  app.post('/alert', (req: Request) => {
    const alert = req.body as Alert;
    console.log('in alert..');
    console.log(alert);
    // if (validAlert(alert)) {
    //   // post to mongo
    //   handleAlert(alert);
    // }
  });

  return app.listen(port, () => {
    console.log(`DJG Data Handler listening on port: ${port}`);
  });
};

const handleFlow = (flow: Flow) => {
  console.log('handling flow....');
  console.log(flow);
};

const handleAlert = (alert: Alert) => {
  console.log('handling alert....');
  console.log(alert);
};

export { createServer };
