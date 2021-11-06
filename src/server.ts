import express, { Request, Response } from 'express';
import 'dotenv/config';

import { Flow, Alert } from 'common/models';
import { modifyFlow } from 'modifiers/flowModifier';
import { validFlow } from 'validators/flowValidator';
import { validAlert } from 'validators/alertValidator';
import { validFlowMessage } from 'validators/validFlowMessage';

const createServer = () => {
  const port = process.env.DATA_HANDLER_PORT || '';

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post('/flow', (req: Request) => {
    const modifiedFlow = modifyFlow(req.body as Flow);

    if (validFlow(modifiedFlow)) {
      // post to mongo
      console.log('post flow to mongo...');
      if (validFlowMessage(modifiedFlow)) {
        console.log('send flow to datjuanitagurl');
        console.log(modifiedFlow);
      }
    }
  });

  app.post('/alert', (req: Request) => {
    const alert = req.body as Alert;

    if (validAlert(alert)) {
      // post to mongo to keep track of flow

      console.log('send alert to datjuanitagurl');
      console.log(alert);
    }
  });

  return app.listen(port, () => {
    console.log(`DJG Data Handler listening on port: ${port}`);
  });
};

export { createServer };
