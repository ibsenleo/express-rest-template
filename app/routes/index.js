import express from 'express'
import v1 from './v1/index'

var router = express.Router();
router.use('/v1', v1)


export default router
