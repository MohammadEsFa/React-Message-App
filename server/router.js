const express = require('express')
const router = express.Router()

router.get('/', (req , res) => {
    res.send('server is Up and Running')
})

module.exports = router;