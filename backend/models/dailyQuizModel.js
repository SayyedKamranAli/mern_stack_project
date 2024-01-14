// models/Question.js
const mongoose = require('mongoose');

const DailyQuizSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  answerOptions: [
    {
      answerText: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const DailyQuiz = mongoose.model('DailyQuiz', DailyQuizSchema);

module.exports = DailyQuiz;
