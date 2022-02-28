import * as mongoose from 'mongoose';

interface IPlayer extends mongoose.Document {
    username: string;
    email: string;
    password: string;
}

const PlayerSchema = new mongoose.Schema({
    username:{ type: String, required: true, unique: true, dropDups: true },
    email:{ type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true}


},{
    timestamps: true
});

export const Player: mongoose.Model<IPlayer> = mongoose.model('Player', PlayerSchema);
