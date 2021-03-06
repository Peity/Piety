import * as mongoose from 'mongoose';
import { Member } from './members';
import { Player } from './player';


export interface IClan extends mongoose.Document {
    name: string;
    slug: string;
    owner: mongoose.Types.ObjectId;
    gold: number;
    supply: number;
    level: number;
    members: Array<mongoose.Types.ObjectId>;
}

const ClanSchema = new mongoose.Schema<IClan>({
    name:{ type: String, required: true, unique: true, dropDups: true },
    slug:{ type: String, required: true, unique: true, dropDups: true },
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player', unique: true, required: true},
    gold: { type: Number, default: 1000},
    supply: { type: Number, default: 1000},
    level: { type: Number, default: 0},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member'}]

},{
    timestamps: true
});

/**
 * This method shall get called after clan initiated to update the related Player document's clan field.
 * @returns 
 */
ClanSchema.methods.updateRelatedPlayer = async function updateRelatedPlayer() {
    const player = await Player.findById(this.owner);

    if(!player){
        return `No player found`;
    }

    player.overwrite({
        username: player.username,
        slug: player.slug,
        email: player.email,
        password: player.password,
        clan: this._id
    });

    player.save();
    return `Successfully updated ${player.username}`;
};

/**
 * This method shall get called right before removing the clan to clear the related player's clan field in Player document.
 * @returns 
 */ 
ClanSchema.methods.removeRelatedPlayer = async function removeRelatedPlayer() {
    const player = await Player.findById(this.owner);

    if(!player){
        return `No player found`;
    }

    player.overwrite({
        username: player.username,
        slug: player.slug,
        email: player.email,
        password: player.password,
        clan: null
    });

    player.save();
    return `Successfully updated ${player.username}`;
};

ClanSchema.methods.deleteAllRelevantMembers = async function (){
    const members = await Member.find({ 'clan_id' : this._id });
    
    members.forEach(member => {
        member.delete();
    });

    this.members = [];
    await this.save();
};

/**
 * TODO:
 * Define all methods for easy database relation fetch.
 */

export const Clan: mongoose.Model<IClan> = mongoose.model('Clan', ClanSchema);