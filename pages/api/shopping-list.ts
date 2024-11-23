import { connectToDatabase } from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const client = await connectToDatabase();

    if (req.method === "POST") {

        const { name, shop, quantity, comment, price } = req.body;

        if (!name || !shop || !quantity || !comment || !price) {
            res.status(400).json({ success: false, message: "Missing field(s)" });
            return
        }

        try {
            const shoppingList = client.db()
            
            const shoppingListCollection = shoppingList.collection("shopping-list");
            
            const result = await shoppingListCollection.insertOne({ name, shop, quantity, comment, price });
            
            res.status(201).json({ success: true, data: 'Sikeresen hozzáadva' });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
            return
        } finally {
            client.close();
        }
    } else if (req.method === "GET") {
        try {
            const shoppingList = client.db()
            
            const shoppingListCollection = shoppingList.collection("shopping-list");
            
            const result = await shoppingListCollection.find().toArray();
            
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
            return
        } finally {
            client.close();
        }
    } else if (req.method === "DELETE") {

        if (!req.body.id) {
            res.status(400).json({ success: false, message: "Missing field(s)" });
            return
        }

        try {
            const shoppingList = client.db()
            
            const shoppingListCollection = shoppingList.collection("shopping-list");
            
            const result = await shoppingListCollection.deleteOne({
                _id: req.body.id
            });
            
            res.status(200).json({ success: true, data: 'Sikeresen törölve' });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
            return
        } finally {
            client.close();
        }
    } else { 
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default handler;