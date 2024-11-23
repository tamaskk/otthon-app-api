import NextCors from "nextjs-cors";
import { connectToDatabase } from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

type Data = {
    
  };

const handler = async (req: NextApiRequest, res: NextApiResponse<{success: boolean, data: any[]}>) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Allow any origin and any method
    await NextCors(req, res, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*", // Allow all origins
      optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const client = await connectToDatabase();

    if (req.method === "GET") {
      const shoppingListCollection = client.db().collection("shopping-list");
      const result = await shoppingListCollection
        .find({ isDone: false })
        .toArray();
      res.status(200).json({ success: true, data: result });

    } 
}

export default handler;
