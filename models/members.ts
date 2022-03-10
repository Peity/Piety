import mongoose from 'mongoose';
import ReadFile from "../helper/ReadFile";
import { Clan } from '../models/clan';
import { TaskName, MemberTypes } from '../helper/enums';
import { Task } from '../models/task';


export interface IMember extends mongoose.Document {
    clan_id: mongoose.Types.ObjectId;
    name: String;
    type: String;
    hired_at: Date;
    task: Task;
    life_status: Boolean;
    revenue: Number;
}

interface MemberModel extends mongoose.Model<IMember> {
    generateName(): string;
}

const MemberSchema = new mongoose.Schema({
    clan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clan', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: MemberTypes, default: MemberTypes.Warrior },
    hired_at: { type: Date, default: Date.now },
    task: { type: Object, default: new Task(0)},
    life_status: { type: Boolean, default: true },
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

/**
 * 
 * @returns 
 */
MemberSchema.methods.updateRelatedClan = async function () {
    const clan = await Clan.findById(this.clan_id);

    if (!clan) {
        return `No clan found`;
    }

    const clanMembers = clan.members;
    clanMembers.push(this._id);

    clan.members = clanMembers;
    clan.save();

    return `operation successfull`;
};

MemberSchema.methods.removefromRelatedClan = async function () {
    const clan = await Clan.findById(this.clan_id);

    if (!clan) {
        return `No clan found`;
    }

    const clanMembers = clan.members;
    const index = clanMembers.indexOf(this._id);
    clanMembers.splice(index, 1);

    clan.members = clanMembers;
    await clan.save();

    return `Operation Successfull`;
};

MemberSchema.methods.kill = async function () {
    this.life_status = false;
};

MemberSchema.methods.changeTask = async function (taskNumber: number): Promise<boolean> {
    this.task.setTask(taskNumber);
    await this.save();
    return true;
};

MemberSchema.methods.cashRevenue = async function (): Promise<boolean> {
    const revenue = this.task.goldRevenue;
    this.revenue += revenue;
    const clan = await Clan.findById(this.clan_id);

    if(clan){
        clan.gold += this.revenue;
        await clan.save();
        await this.save();
        return true;
    }

    return false;
};

export const Member = mongoose.model<IMember, MemberModel>('Member', MemberSchema);
