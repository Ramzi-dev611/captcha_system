import type { NextApiRequest, NextApiResponse } from 'next'
// import LabeledChallengeModel from '../../models/labeled_challenge.model';
import dbConnect from '../../lib/mongodb'
const { connectToDatabase } = require('../../lib/mongodb');

export type ChallengesResponseData = {
    id: string,
    statement: string,
    path: string[],
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await dbConnect();
            // return getPosts(req, res);
            // const reponseData: ChallengesResponseData = {
            //         id: '54qsdjlkhfgfgkjh',
            //         statement: "select images of a cat",
            //         path: ['http://localhost:3000/images/cat2.jpg',
            //             'http://localhost:3000/images/cat3.jpg',
            //             'http://localhost:3000/images/cat.jpg',
            //             'http://localhost:3000/images/cat3.jpg',
            //             'http://localhost:3000/images/cat3.jpg',
            //             'http://localhost:3000/images/cat2.jpg',
            //             'http://localhost:3000/images/cat.jpg',
            //             'http://localhost:3000/images/cat.jpg',
            //             'http://localhost:3000/images/cat3.jpg',
            //         ]
            //     }
            // res.status(200).json(reponseData)

            return;
        }
        case 'POST': {
            return addPost(req, res);
        }
    }
}
async function getPosts(req : NextApiRequest,res: NextApiResponse){
    try {
        console.log('test')
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let posts = await db
            .collection('posts')
            .find({})
            .sort({ published: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error : any) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
} 


async function addPost(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('test')
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('posts').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error : any) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
