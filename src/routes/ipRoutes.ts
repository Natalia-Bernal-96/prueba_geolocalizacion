import { Router } from 'express';
import { IpController } from '../controllers/IpController';

const router = Router();
const ipController = new IpController();

router.get('/:ip', (req, res) => ipController.getIpData(req, res));

export default router;
