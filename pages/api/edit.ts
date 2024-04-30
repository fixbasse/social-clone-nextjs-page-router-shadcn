import serverAuth from "@/lib/server-auth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH') {
        return res.status(405).end();
    };

    try {
        const { currentUser } = await serverAuth(req);
        if (!currentUser) {
            throw new Error("No user");
        };

        const { name, username, bio, profileImage, coverImage } = req.body;

        if (!name || !username) {
            throw new Error("Missing fields.");
        };

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error, 'Error');
        return res.status(400).send('Internal Error at [Edit]'); // comment this to prevent error message
    };
};