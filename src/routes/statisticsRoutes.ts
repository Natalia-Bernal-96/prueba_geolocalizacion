import { Router } from 'express';
import { StatisticsController } from '../controllers/statisticsController';

const router = Router();
const statisticsController = new StatisticsController();

//furthest distance
router.get('/distance', (req, res) => statisticsController.getStatisticsData(req, res));

export default router;
