import * as mongoose from 'mongoose'

export interface IStatement {
    _id?: string;
    statement: string;
}

const StatementSchema = new mongoose.Schema<IStatement>({
    statement: {required: true, type: String}
})

export default mongoose.models.Statement || mongoose.model('Statement', StatementSchema);
