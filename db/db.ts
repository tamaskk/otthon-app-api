import { MongoClient } from "mongodb";


export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
      `mongodb+srv://kalmantamaskrisztian:rruwgVAvx2lrA1le@otthon-app.gtoam.mongodb.net/?retryWrites=true&w=majority&appName=otthon-app`,
      );
  return client;
};