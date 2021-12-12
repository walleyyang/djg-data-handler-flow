import mongoose from 'mongoose';

import { Flow, Alert, ModifiedFlow } from 'common/models';
import { modifyFlow } from 'modifiers/flowModifier';
import { validFlow } from 'validators/flowValidator';
import { validAlert } from 'validators/alertValidator';
import { mongo } from 'common/constants';

// const client = new MongoClient(MONGO_URI);

const databaseConnect = () => {
  mongoose
    .connect(mongo.url, mongo.options)
    .then(() => {
      console.log('DJG Data Handler successfully connected to MongoDB');
    })
    .catch((error) => {
      console.log(error);
    });
};

const databaseFlowHandler = (modifiedFlow: ModifiedFlow) => {
  // const doc = getDoc(modifiedFlow.symbol);
  // await connect();
};

// const getFlow = (modifiedFlow: ModifiedFlow) => {};

// const getDoc = async (symbol: string) => {
//   const symbolCollection = client.db(database).collection(collection);
//   const result = await collection.find({ symbol: symbol });

//   if (await result.hasNext()) {
//     const doc = await result.toArray();
//     const updatedStrikes = this.getUpdatedStrikes(data, doc[0].strikes);
//     const updatedFlow = this.getUpdatedFlow(data, doc[0].flow);
//     const updatedDoc = await collection.updateOne(
//       { symbol: data.symbol },
//       { $set: { strikes: updatedStrikes, flow: updatedFlow } },
//     );
//   } else {
//     await collection.insertOne(this.getDocument(data));
//   }
// };

// const getDoc = (symbol: string) => {
//   // get current symbol from db
//   const temp = {
//     symbol: 'AMZN',
//     summary: {
//       trend: 'BULLISH',
//       topBullishStrike: 150,
//       topBearishStrike: 100,
//       totalFlow: 3,
//       totalBullishFlow: 2,
//       totalBearishFlow: 1,
//     },
//     trend: [1, 2, 1],
//     topStrikes: [
//       {
//         strike: 150,
//         estimatedValue: 10000,
//       },
//     ],
//     flows: [
//       {
//         messageType: 'FLOW',
//         time: '11:15:50',
//         symbol: 'MSFT',
//         expiration: '11/11/2021',
//         strike: 150,
//         position: 'CALL',
//         stockPrice: 140,
//         details: '150@10.00 AA',
//         type: 'SWEEP',
//         value: '$10.5K',
//         estimatedValue: 10000,
//         goldenSweep: false,
//         sentiment: 'BULLISH',
//       },
//     ],
//   } as FlowDoc;
//   return temp;
// };

export { databaseFlowHandler, databaseConnect };
