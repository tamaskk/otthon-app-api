import Cors from 'nextjs-cors';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // Run the middleware to allow CORS
  await Cors(req, res, {
    methods: ['GET', 'POST', 'OPTIONS'],  // Allowed methods
    origin: '*',  // Adjust the origin in production as needed
    optionsSuccessStatus: 200,
  });

  // Your actual API logic
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
