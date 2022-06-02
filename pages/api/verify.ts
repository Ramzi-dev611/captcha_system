import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import RequestChallengeModel, { IRequestChallenge } from '../../models/request_challenge'
import unlabeled_challengesModel, { IUnlabeledChallenge } from "../../models/unlabeled_challenges.model";
import  {ChallengesResponseData, generateChallengeRequest } from "./challenges";

export type verifyInput =
{
    requestId?: string,
    responses: {
        ChallengeID: string,
        label: boolean}[]
}

export type verifyResponse =
{
    code: number;
    message: string;
    newChallenge?: ChallengesResponseData
} 

dbConnect()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    if(method ==="POST"){
        
        const { requestId, responses } = JSON.parse(req.body) as verifyInput 
        const requestChallenge: IRequestChallenge = await (await RequestChallengeModel.findById(requestId).exec());
        let count= 0;
        requestChallenge.challenges.forEach( (el,index)=>{
            count+= el.expectedAnswer? (el.expectedAnswer===responses[index].label ? 1:0) : 0
        })
        if (count==5){
            const response : verifyResponse = {message:"congratulation you passed the test", code: 2 } ;
            requestChallenge.challenges.forEach(async (el,index)=>{
                
                    let challenge : IUnlabeledChallenge = await (await unlabeled_challengesModel.findOneAndUpdate(
                        {_id : el.challengeId},
                        {
                           $inc : 
                                {'stats.numberOfCollectedAnswers':1,
                                'stats.numberOfPositive' : responses[index].label?1:0,
                                'stats.numberOfNegative' : responses[index].label?0:1,
                                    
                        }                            
                        }
                        ).exec());

            })

            res.status(200).json(response);
            return ;
        }
        if(requestChallenge.requestTake==2){
            const response : verifyResponse = {message:"you failed the test please try again",code:1} ;
            res.status(300).json(response);
            return ;
        }
        const challenges: ChallengesResponseData = await generateChallengeRequest(2) ;
        res.status(200).json({message: "here is a new challenge for you", newChallenge: challenges, code:0});
       
    }
}