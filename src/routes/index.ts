import { Router } from 'express';
import { checkHealth } from '../controllers/healthController';

import authRoutes from './authRoutes';
import assetRoutes from './assetRoutes';
import timetableRoutes from './timetableRoutes';
import userRoutes from './userRoutes';
import auditLogRoutes from './auditLogRoutes';
import borrowRequestRoutes from './borrowRequestRoutes';
import researchReportRoutes from './researchReportRoutes';
import usageLogRoutes from './usageLogRoutes';

const router = Router();

// Health check route
router.get('/health', checkHealth);

// Thêm các routes khác ở đây
router.use('/auth', authRoutes);
router.use('/assets', assetRoutes);
router.use('/timetables', timetableRoutes);
router.use('/users', userRoutes);
router.use('/audit-logs', auditLogRoutes);
router.use('/borrow-requests', borrowRequestRoutes);
router.use('/research-reports', researchReportRoutes);
router.use('/usage-logs', usageLogRoutes);

export default router;
