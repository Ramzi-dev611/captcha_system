import type { NextApiRequest, NextApiResponse } from 'next'
import LabeledChallengeModel, { ILabeledChallenge } from '../../models/labeled_challenge.model';
import RequestChallengeModel from '../../models/request_challenge'
import StatemntModel, { IStatement } from '../../models/statement'
import dbConnect from '../../lib/mongodb'
import UnlabeledChallengeModel, { IUnlabeledChallenge } from '../../models/unlabeled_challenges.model';

 type ChallengesStored = 
     {
        challengeId?: string,
        expectedAnswer?: boolean
    }[]


export type ChallengesResponseData = {
    id_request?: string,
    statement?: string,
    challenges?: {
        challenge_id?: string,
        path: string
    }[],
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    await getChallenges(req, res);
}
async function getChallenges(req : NextApiRequest,res: NextApiResponse){
    await dbConnect();
    // get the handeled statemnet
    const statmentObject: IStatement = await (await StatemntModel.aggregate([{$sample: { size: 1 }}]).exec()).at(0)
    const { statement } = statmentObject;
    // get the labeled challenges
    const labeledChallengesList: ILabeledChallenge[] = await (await LabeledChallengeModel.aggregate([{ $match: { statement } }, { $sample: { size: 5 } }]).exec())
    // get the unlabeled challenges
    const unlabeledChallenegesList: IUnlabeledChallenge[] = await (await UnlabeledChallengeModel.aggregate([{ $match: { statement } }, { $sample: { size: 4 } }]).exec())
    // save the challenge as a first take
    
    let challenges: ChallengesStored = labeledChallengesList.map(challenge => ({ challengeId: challenge._id, expectedAnswer:challenge.stats.expectedLabel}))
    challenges =[...challenges,...unlabeledChallenegesList.map(challenge => ({ challengeId: challenge._id}))]

    const requestModel = new RequestChallengeModel({ 
        requestTake: 1,
        statement,
        challenges 
        })

        await requestModel.save();
        console.log("saved requestModel ")

    // format and return the response to the page
    const response: ChallengesResponseData = {}
    response.id_request = "random string that will be replaced by the id of the stored request"
    response.statement = statement
    response.challenges = labeledChallengesList.map(challenge => ({ challenge_id: challenge._id, path: challenge.imagePath}))
    // response.challenges.concat(unlabeledChallenegesList.map(challenge => ({ challenge_id: challenge._id, path: challenge.imagePath })))
    response.challenges =[...response.challenges,...unlabeledChallenegesList.map(challenge => ({ challenge_id: challenge._id, path: challenge.imagePath }))]
    console.log(response.challenges);
    res.status(200).json(response)
}
