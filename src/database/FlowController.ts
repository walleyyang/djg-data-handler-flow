import { NextFunction, Request, Response } from 'express';

import Flow from 'database/FlowSchema';

const getFlow = (req: Request, res: Response, next: NextFunction) => {
  Flow.find()
    .exec()
    .then((results) => {
      return res.status(200).json({
        flow: results,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { getFlow };
