import type { NextApiRequest, NextApiResponse } from 'next'
import LabeledChallengeModel, { ILabeledChallenge } from '../../models/labeled_challenge.model';
import RequestChallengeModel from '../../models/request_challenge'
import StatemntModel, { IStatement } from '../../models/statement'
import dbConnect from '../../lib/mongodb'
const { connectToDatabase } = require('../../lib/mongodb');

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
    const statmentObject: IStatement = await (await StatemntModel.find().exec()).at(0)
    const { statement } = statmentObject;

    const challengesList: ILabeledChallenge[] = await (await LabeledChallengeModel.find({ statement }).limit(5).exec())
    const response: ChallengesResponseData = {}
    response.id_request = "random string that will be replaced by the id of the stored request"
    response.statement = statement
    response.challenges = challengesList.map(challenge => ({ challenge_id: challenge._id, path: challenge.imagePath}))
    res.status(200).json(response)
}
