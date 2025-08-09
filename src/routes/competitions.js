// 📂 src/routes/trades.js

import express from "express";
import Trade from "../models/trade.js"; // model to adapt according to your project
import Agent from "../models/agent.js"; // ditto
import Competition from "../models/competition.js"; // ditto

const router = express.Router();

 /**
  * GET /competitions/:id/trades
  * Returns the most recent trades of a competition
  */
 router.get("/competitions/:id/trades", async (req, res) => {
   try {
     const { id } = req.params;
     const { page = 1, limit = 20 } = req.query;

     const trades = await Trade.find({ competitionId: id })
       .populate("agentId", "name")
       .sort({ createdAt: -1 })
       .skip((page - 1) * limit)
       .limit(parseInt(limit));

     res.json({
       competitionId: id,
       total: trades.length,
       page: parseInt(page),
       trades,
     });
   } catch(err) {
     res.status(500).json({ error: err.message });
   }
 });

 /**
* GET /competitions/:id/agents/:agentId/trades
* Returns the trades of a specific agent in a competition
*/
router.get("/competitions/:id/agents/:agentId/trades", async (req, res) => {
try {
const { id, agentId } = req.params;
const { page = 1, limit = 20 } = req.query;

const trades = await Trade.find({
competitionId: id,
agentId: agentId,
})
.populate("agentId", "name")
.sort({ createdAt: -1 })
.skip((page - 1) * limit)
.limit(parseInt(limit));

res.json({
competitionId: id,
agentId,
       total: trades.length,
       page: parseInt(page),
       trades,
     });
   } catch(err) {
     res.status(500).json({ error: err.message });
   }
 });

 export default router;
