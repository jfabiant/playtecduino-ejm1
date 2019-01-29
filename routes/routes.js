const express = require('express');
const router = express.Router();

router.get('/teacher/', function(req, res){
    res.render('teacher');
});
router.get('/student/', function(req, res){
    res.render('student');
});

module.exports = router;