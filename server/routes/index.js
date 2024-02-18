const router = require('express').Router();
const apiCards = require('./cards')

router.use('/cards', apiCards)


module.exports = router;