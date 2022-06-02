import type { NextApiRequest, NextApiResponse } from 'next'
import LabeledChallengeModel, { ILabeledChallenge } from '../../models/labeled_challenge.model';
import RequestChallengeModel, { IRequestChallenge } from '../../models/request_challenge'
import StatemntModel, { IStatement } from '../../models/statement'
import dbConnect from '../../lib/mongodb'
import UnlabeledChallengeModel, { IUnlabeledChallenge } from '../../models/unlabeled_challenges.model';

 type ChallengesStored = 
     {
        challengeId?: string,
        expectedAnswer?: boolean
    }[]


export type ChallengesResponseData = {
    requestId?: string,
    statement?: string,
    challenges?: {
        challengeId?: string,
        path: string
    }[],
}


type mappedChallenges = {
    challengeId?: string,
    expectedAnswer?: boolean
    path: string
}[]


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    await getChallenges(req, res);
}
async function getChallenges(req : NextApiRequest,res: NextApiResponse){
    await dbConnect();
    const response = await generateChallengeRequest(1);
    res.status(200).json(response)

}


export const generateChallengeRequest = async (take:number): Promise<ChallengesResponseData> =>{
    // get the handeled statemnet
    const statmentObject: IStatement = await (await StatemntModel.aggregate([{$sample: { size: 1 }}]).exec()).at(0)
    const { statement } = statmentObject;
    // get the labeled challenges
    const labeledChallengesList: ILabeledChallenge[] = await (await LabeledChallengeModel.aggregate([{ $match: { statement } }, { $sample: { size: 5 } }]).exec())
    // get the unlabeled challenges
    const unlabeledChallenegesList: IUnlabeledChallenge[] = await (await UnlabeledChallengeModel.aggregate([{ $match: { statement } }, { $sample: { size: 4 } }]).exec())
    // save the challenge as a first take
    
    //                   ***TODO***
    //   shuffle the challenges list before pushing to bd 
    let challenges: mappedChallenges = labeledChallengesList.map(challenge => ({ challengeId: challenge._id, expectedAnswer:challenge.stats.expectedLabel, path:challenge.imagePath}))
    challenges =[...challenges,...unlabeledChallenegesList.map(challenge => ({ challengeId: challenge._id, path:challenge.imagePath}))]


//shuffle
    function shuffle(array:any) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
    }

    challenges = shuffle ( challenges);

    let challengesStored: ChallengesStored = challenges.map(challenge => ({ challengeId: challenge.challengeId, expectedAnswer:challenge.expectedAnswer}))
    const requestModel = new RequestChallengeModel({ 
        requestTake: take,
        statement,
        challenges: challengesStored 
        })

        const newRequestModel : IRequestChallenge = await requestModel.save();
        

    // format and return the response to the page
    const response: ChallengesResponseData = {
        requestId: newRequestModel._id,
        statement,
        challenges: challenges.map(challenge => ({ challengeId: challenge.challengeId, path: challenge.path }))
    }        
    return response;

}