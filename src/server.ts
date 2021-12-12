import express, { Request } from 'express';

import { Flow, Alert } from 'common/models';
import { modifyFlow } from 'modifiers/flowModifier';
import { validFlow } from 'validators/flowValidator';
import { validAlert } from 'validators/alertValidator';
import { dataHandlerPort } from 'common/constants';

const app = express();

const createServer = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post('/flow', (req: Request) => {
    const modifiedFlow = modifyFlow(req.body as Flow);

    if (validFlow(modifiedFlow)) {
      console.log('send flow to datjuanitagurl');
      console.log(modifiedFlow);
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

  return app.listen(dataHandlerPort, () => {
    console.log(`DJG Data Handler server listening on port: ${dataHandlerPort}`);
  });
};

export { createServer };
