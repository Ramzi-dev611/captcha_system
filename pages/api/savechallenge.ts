import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import unlabeledChallenge from "../../models/unlabeled_challenges.model";


dbConnect()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    if(method ==="GET"){
        const model = new unlabeledChallenge({
            statement: "select images of a cat",
            imagePath: "http://localhost:3000/images/dog1.png",
            stats: {
                numberOfCollectedAnswers: 3800,
                numberOfPositive: 630,
                numberOfNegative: 3170,
            }
        })
        model.save();
        console.log("I saved a document")
        res.status(200).json({message: "khrit fiiih 2.0"});
    }
}