import * as mongoose from 'mongoose';


export interface IClan extends mongoose.Document {
    name: string;
    slug: string;
    owner: mongoose.Types.ObjectId;
    gold: number;
    supply: number;
    level: number;
}

const ClanSchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true, dropDups: true },
    slug:{ type: String, required: true, unique: true, dropDups: true },
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
    gold: { type: Number, default: 1000},
    supply: { type: Number, default: 1000},
    level: { type: Number, default: 0}
},{
    timestamps: true
});

export const Player: mongoose.Model<IClan> = mongoose.model('Clan', ClanSchema);
