import Cors from 'nextjs-cors';
import { connectToDatabase } from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import NextCors from 'nextjs-cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Allow any origin and any method
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
         });

        const client = await connectToDatabase();

        // Handle POST request
        if (req.method === "POST") {
            const { name, shop, quantity, comment, price } = req.body;

            if (!name || !shop || !quantity || !comment || !price) {
                res.status(400).json({ success: false, message: "Missing field(s)" });
                return;
            }

            const shoppingListCollection = client.db().collection("shopping-list");
            await shoppingListCollection.insertOne({ name, shop, quantity, comment, price });
            res.status(201).json({ success: true, data: "Sikeresen hozzáadva" });

        // Handle GET request
        } else if (req.method === "GET") {
            const shoppingListCollection = client.db().collection("shopping-list");
            const result = await shoppingListCollection.find({ isDone: false }).toArray();
            res.status(200).json({ success: true, data: result });

        // Handle DELETE request
        } else if (req.method === "DELETE") {
            const { id } = req.body;
            if (!id) {
                res.status(400).json({ success: false, message: "Missing field(s)" });
                return;
            }

            const shoppingListCollection = client.db().collection("shopping-list");
            await shoppingListCollection.deleteOne({ _id: new ObjectId(id) });
            res.status(200).json({ success: true, data: "Sikeresen törölve" });

        // Handle PATCH request
        } else if (req.method === "PATCH") {
            const { id } = req.body;
            if (!id) {
                res.status(400).json({ success: false, message: "Missing field(s)" });
                return;
            }

            const shoppingListCollection = client.db().collection("shopping-list");
            await shoppingListCollection.updateOne({ _id: new ObjectId(id) }, { $set: { isDone: true } });
            res.status(200).json({ success: true, data: "Sikeresen frissítve" });

        // Handle invalid HTTP methods
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export default handler;
