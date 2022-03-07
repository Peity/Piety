import * as mongoose from 'mongoose';
import { Player } from './player';


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
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player', unique: true, required: true},
    gold: { type: Number, default: 1000},
    supply: { type: Number, default: 1000},
    level: { type: Number, default: 0}
},{
    timestamps: true
});

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



export const Clan: mongoose.Model<IClan> = mongoose.model('Clan', ClanSchema);

