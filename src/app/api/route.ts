import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get("http://localhost:8000/api/auth/check-auth", {
      withCredentials: true, // Important to send the HTTP-only cookie
    });

    res.status(200).json({ isAuthenticated: true, userId: response.data.userId });
  } catch (error) {
    console.error(error);
    res.status(401).json({ isAuthenticated: false });
  }
}
