import mongoose from 'mongoose';


export interface IMember extends mongoose.Document{
    clan_id: mongoose.Types.ObjectId;
    name: String;
    type: String;
    hired_at: Date;
    state: Number;
    life_status: Boolean;
    revenue: Number;
}

export enum MemberTypes {
    Warrior = `Warrior`,
    Farmer = `Farmer`
}

const MemberSchema = new mongoose.Schema({
    clan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clan', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: MemberTypes, default: MemberTypes.Warrior},
    hired_at: { type: Date, default: Date.now },
    life_status: { type: Boolean, default: true},
    revenue: { type: Number, default: 0 }
});

export const Member: mongoose.Model<IMember> = mongoose.model('Mamber', MemberSchema);