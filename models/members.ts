import mongoose from 'mongoose';
import ReadFile from "../helper/ReadFile";


export interface IMember extends mongoose.Document{
    clan_id: mongoose.Types.ObjectId;
    name: String;
    type: String;
    hired_at: Date;
    state: Number;
    life_status: Boolean;
    revenue: Number;
}

interface MemberModel extends mongoose.Model<IMember>{
    generateName(): string;
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

MemberSchema.static('generateName', function generateName() {
    const readFile = new ReadFile();
    const names = readFile.readTextFile('name.txt');
    const family = readFile.readTextFile('family.txt');
    const nameIndex = Math.floor(Math.random() * names.length);
    const familyIndex = Math.floor(Math.random() * family.length);

    return names[nameIndex] + " " + family[familyIndex];
});

export const Member = mongoose.model<IMember, MemberModel>('Member', MemberSchema);


