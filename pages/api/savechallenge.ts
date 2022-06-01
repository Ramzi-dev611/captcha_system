import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import LabeledChallenge from '../../models/labeled_challenge.model'


dbConnect()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    if(method ==="GET"){
        const model = new LabeledChallenge({
            statement: "select images of a cat",
            imagePath: "http://localhost:3000/images/cat.png",
            stats: {
                numberOfCollectedAnswers: 5000,
                numberOfPositive: 4715,
                numberOfNegative: 285,
                expectedLabel: true,
                confidenceLevel: 0.94
            }
        })
        model.save();
        console.log("I saved a document")
        res.status(200).json({message: "khrit fiiih"});
    }
}