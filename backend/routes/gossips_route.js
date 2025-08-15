import express from 'express';
import Gossips from '../models/gossips_model.js'

const router=express.Router();


router.post("/share",async (req, res)=>{
    try{
        const {username, gossip,upvote, downvote, time}= req.body;
        if (!username || !gossip|| !time) {
              return res.status(400).json({ error: "All fields are required" });
            }
        const newgossip= new Gossips({username, gossip, upvote, downvote, time});
        await newgossip.save();

    res.status(201).json({msg:"Gossip shared"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;