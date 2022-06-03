import * as mongoose from 'mongoose'
import {number} from "prop-types";
export interface ILabeledChallenge {
    _id?: string;
    statement: string;
    imagePath: string;
    stats: {
        numberOfCollectedAnswers: number,
        numberOfPositive: number,
        numberOfNegative: number,
        expectedLabel: boolean,
        confidenceLevel: number
    }
}


const LabeledChallengeSchema = new mongoose.Schema<ILabeledChallenge>({
    statement: { required: true, type: String },
    imagePath: { required: true, type: String },
    stats: {
        numberOfCollectedAnswers:{type:Number},
        numberOfPositive:{type:Number},
        numberOfNegative:{type:Number},
        expectedLabel:{type:Boolean},
        confidenceLevel:{
            type: Number,
             default:

            function () {
                return  (this.stats.expectedLabel?this.stats.numberOfPositive:this.stats.numberOfNegative) / this.numberOfCollectedAnswers;
            }
}
    }
})



export default mongoose.models.LabeledChallenge || mongoose.model('LabeledChallenge', LabeledChallengeSchema);