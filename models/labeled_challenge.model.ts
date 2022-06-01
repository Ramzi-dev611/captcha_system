import * as mongoose from 'mongoose'
export interface ILabeledChallenge {
    _id?: String;
    statement: String;
    imagePath: String;
    stats: {
        numberOfCollectedAnswers: number,
        numberOfPositive: number,
        numberOfNegative: number,
        expectedLabel: boolean,
        confidenceLevel: number
    }
}

export const statsSchema = new mongoose.Schema({
    numberOfCollectedAnswers: {type: Number},
    numberOfPositive: {type: Number},
    numberOfNegative: {type: Number},
    expectedLabel: {type: Boolean},
    confidenceLevel: {type: Number}
})

const LabeledChallengeSchema = new mongoose.Schema<ILabeledChallenge>({
    statement: { required: true, type: String },
    imagePath: { required: true, type: String },
    stats: {type: statsSchema}
})



export default mongoose.models.LabeledChallenge || mongoose.model('LabeledChallenge', LabeledChallengeSchema);