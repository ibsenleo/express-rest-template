import express from 'express'
var router = express.Router();

router.get('/', getChildren)

function getChildren(req, res) {
    res.send("children response")
}
export default router
