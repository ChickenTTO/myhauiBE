"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHealth = void 0;
const checkHealth = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Backend is up and running!',
        timestamp: new Date().toISOString()
    });
};
exports.checkHealth = checkHealth;
