import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";



dbConnect()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    if(method ==="GET"){
        const 
        {req_id,
        requestTake,
        statement,
        challenges} = req.query ;
        // new unlabeledChallenge({
        //     statement: "select images of a cat",
        //     imagePath: "http://localhost:3000/images/cat2.png",
        //     stats: {
        //         numberOfCollectedAnswers: 4200,
        //         numberOfPositive: 3760,
        //         numberOfNegative: 440,
        //     }
        // })
        // requestModel.save();
        console.log("")
        res.status(200).json({message: "khrit fiiih 2.0"});
    }
}