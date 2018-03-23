import express from 'express'
import children from './children'

var router = express.Router();
router.use('/children', children)
router.get('/', function(req, res) {
    res.send("API  V1.0 - Project Name");
})


export default router
