import * as mongoose from 'mongoose'

export interface IUnlabeledChallenge{
    _id? : string;
    statement : string;
    imagePath: string;
    stats:{
        numberOfCollectedAnswers: number;
        numberOfPositive: number;
        numberOfNegative: number;

    }
}

const stats = new mongoose.Schema({
    numberOfCollectedAnswers:{ required: true, type: Number},
    numberOfPositive: {required:true, type: Number },
    numberOfNegative: {required:true, type: Number}

})
const unlabeledChallengeSchema = new mongoose.Schema<IUnlabeledChallenge>({
    _id:        {required : true, type : mongoose.Types.ObjectId},
    statement: { required: true, type: String},
    imagePath: { required:true, type: String},
    stats:     {required: true ,type : stats}

})

export default mongoose.model("unlabeledChallenge",unlabeledChallengeSchema)