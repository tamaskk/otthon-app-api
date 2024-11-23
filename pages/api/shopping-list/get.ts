import Cors from 'nextjs-cors';
import { connectToDatabase } from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

type Data = {
    name: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // Run the middleware to allow CORS
  await Cors(req, res, {
    methods: ['GET', 'POST', 'OPTIONS'],  // Allowed methods
    origin: '*',  // Adjust the origin in production as needed
    optionsSuccessStatus: 200,
  });

  res.status(200).json({ name: 'John Doe' });

//   const client = await connectToDatabase();

//   if (req.method === "GET") {
//     const shoppingListCollection = client.db().collection("shopping-list");
//     const result = await shoppingListCollection
//       .find({ isDone: false })
//       .toArray();
//     res.status(200).json({ success: true, data: result });
//   }
};

export default handler;
