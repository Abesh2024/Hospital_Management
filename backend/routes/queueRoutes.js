import express from 'express';
import { getQueue, updateQueue , addPatientToQueue, removePatientFromQueue } from '../controllers/queueController.js';

const router = express.Router();

router.get('/getAllQueue', getQueue);
router.post('/queue', addPatientToQueue);
router.put('/:id', updateQueue);
router.delete('/:id/remove', removePatientFromQueue);

export default router;
