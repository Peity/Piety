import mongoose from "mongoose";
import endpoint from '../endpoints.config';

const {MONGO_URL} = endpoint;

export const mongo =  mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Successfully connected to mongoDB");
  },
  (err) => {
    console.log(err);
    
  });
