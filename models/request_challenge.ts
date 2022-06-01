import * as mongoose from 'mongoose'

export interface IRequestChallenge{
    _id?: string;
    requestTake: number;
    statement: string;
    challenges: {
        challengeId: string;
        expectedAnswer: boolean
    }[]
}

export const ChallengeSchema = new mongoose.Schema({
    challengeId: { required:true, type: String},
    expectedAnswer: { required:true, type: Boolean}
})

export const RequestChallengeSchema = new mongoose.Schema({
    requestTake: {required: true, type: Number},
    statement: { required: true, type: String },
    challenges: { required: true, type: [ChallengeSchema]}
})

export default mongoose.models.RequestChallenge || mongoose.model('RequestChallenge', RequestChallengeSchema);