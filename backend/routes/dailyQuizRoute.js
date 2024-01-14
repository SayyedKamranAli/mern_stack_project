const express = require("express")
const DailyQuiz = require("../models/dailyQuizModel")


const router = express.Router()

router.post('/addquiz', async (req, res) => {
  try {
    const question = new DailyQuiz(req.body);
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// Get all questions
router.get('/dailyquizmcq', async (req, res) => {
  try {
    const questions = await DailyQuiz.find().sort({ _id: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});




module.exports = router;