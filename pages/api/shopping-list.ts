import { connectToDatabase } from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "nextjs-cors";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await Cors(req, res, {
        methods: ["GET", "POST", "DELETE"],
        origin: "*", // Update with specific origins in production
        optionsSuccessStatus: 200,
    });

    const client = await connectToDatabase();

    if (req.method === "POST") {
        const { name, shop, quantity, comment, price } = req.body;

        if (!name || !shop || !quantity || !comment || !price) {
            res.status(400).json({ success: false, message: "Missing field(s)" });
            return;
        }

        try {
            const shoppingList = client.db();
            const shoppingListCollection = shoppingList.collection("shopping-list");

            const result = await shoppingListCollection.insertOne({
                name,
                shop,
                quantity,
                comment,
                price,
            });

            res.status(201).json({ success: true, data: "Sikeresen hozzáadva" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    } else if (req.method === "GET") {
        try {
            const shoppingList = client.db();
            const shoppingListCollection = shoppingList.collection("shopping-list");

            const result = await shoppingListCollection.find({isDone: false}).toArray();

            res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    } else if (req.method === "DELETE") {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, message: "Missing field(s)" });
            return;
        }

        try {
            const shoppingList = client.db();
            const shoppingListCollection = shoppingList.collection("shopping-list");

            const result = await shoppingListCollection.deleteOne({
                _id: new ObjectId(id),
            });

            res.status(200).json({ success: true, data: "Sikeresen törölve" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    } else if (req.method === "PATCH") {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, message: "Missing field(s)" });
            return;
        }

        try {
            const shoppingList = client.db();
            const shoppingListCollection = shoppingList.collection("shopping-list");

            const result = await shoppingListCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { isDone: true } }
            );

            res.status(200).json({ success: true, data: "Sikeresen frissítve" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default handler;
