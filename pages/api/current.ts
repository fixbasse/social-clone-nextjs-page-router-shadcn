import serverAuth from "@/lib/server-auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    };

    try {
        const { currentUser } = await serverAuth(req);

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error, 'Error');
        return res.status(400).send('Internal Error at [CurrentUser]'); // comment this to prevent error message
    };
};