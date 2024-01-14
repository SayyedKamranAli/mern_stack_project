import React, { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Grid,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  IconButton,
  Tooltip,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { getQuiz, addQuiz } from "../../actions/dailyQuizAction";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    minHeight: "100vh",
  },
}));

const initialQuestion = {
  questionText: "",
  answerOptions: [
    { answerText: "", isCorrect: true },
    { answerText: "", isCorrect: false },
    { answerText: "", isCorrect: false },
    { answerText: "", isCorrect: false },
  ],
};

function DailyQuiz() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(initialQuestion);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const { dailyquiz } = useSelector((state) => state.quiz);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleAnswerTextChange = (index, newText) => {
    const updatedAnswers = [...question.answerOptions];
    updatedAnswers[index].answerText = newText;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      answerOptions: updatedAnswers,
    }));
  };
  const handleIsCorrectChange = (index) => {
    const updatedAnswers = [...question.answerOptions];
    updatedAnswers.forEach((answer, i) => {
      answer.isCorrect = i === index;
    });
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      answerOptions: updatedAnswers,
    }));
  };

  const handleQuestionTextChange = (newText) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionText: newText,
    }));
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        dispatch(addQuiz(question));
        setTimeout(() => {
          dispatch(getQuiz());
        }, 1000);
      } catch (error) {}
      setOpen(false);
    }, 1500);
    setQuestion(initialQuestion);
  };

  React.useEffect(() => {
    dispatch(getQuiz());
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < dailyquiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const row = [];

  dailyquiz &&
    dailyquiz?.map((item, index) => {
      const answerText = item?.answerOptions
        ?.map((item, index) => item.answerText)
        .join(", ");
      let data = [];
      item?.answerOptions?.map((item, index) => {
        if (item.isCorrect === true) {
          data.push(item.answerText);
        }
      });

      const isCorrect = data[0];

      row.push({
        index: index + 1,
        id: item._id,
        questionText: item.questionText,
        answerText: answerText,
        isCorrect: isCorrect,
      });
    });


  const columns = [
    { field: "index", headerName: "ID", width: 90 },

    {
      field: "questionText",
      headerName: "Question",
      width: 300,
      editable: true,
      
    },
    {
      field: "answerText",
      headerName: "Option",
      width: 300,
      editable: true,
    },
    {
      field: "isCorrect",
      headerName: "Correct Answer",
      width: 200,
      editable: true,
    },
  ];

  return (
    <>
      <TopBar />
      <Grid container className={classes.contentContainer}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} style={{ paddingLeft: "20px" }}>
          <Box
            sx={{
              height: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">Daily Quiz</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ minWidth: 120, alignSelf: "flex-end", marginBottom: "8px" }}
            >
              Add
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                rows={row}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                // pageSizeOptions={[5]}
                components={{ Toolbar: GridToolbar }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
            {/* {showScore ? (
              <Typography variant="h4">
                You scored {score} out of {dailyquiz.length}
              </Typography>
            ) : (
              <>
                <div className="question-section" style={{ margin: "5px" }}>
                  <Typography variant="h4">
                    <span>Question {currentQuestion + 1}</span>/
                    {dailyquiz.length}
                  </Typography>
                  <Typography variant="h6">
                    {dailyquiz[currentQuestion]?.questionText}
                  </Typography>
                </div>
                <Grid
                  item
                  style={{ margin: "5px", display: "flex", gap: "5px" }}
                >
                  {dailyquiz[currentQuestion]?.answerOptions.map(
                    (answerOption, key) => (
                      <Box key={key}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleAnswerOptionClick(answerOption.isCorrect)
                          }
                        >
                          {answerOption.answerText}
                        </Button>
                      </Box>
                    )
                  )}
                </Grid>
              </>
            )} */}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Question</DialogTitle>
              <DialogContent>
                <DialogContentText>Please Add Question form.</DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Question"
                      variant="outlined"
                      value={question.questionText}
                      onChange={(e) => handleQuestionTextChange(e.target.value)}
                      required
                    />
                  </Grid>
                  <DialogTitle>Answer Options</DialogTitle>
                  <Grid item xs={12}>
                    <RadioGroup>
                      {question.answerOptions.map((answer, index) => (
                        <FormControlLabel
                          key={index}
                          value={answer.answerText}
                          control={<Radio />}
                          label={
                            <TextField
                              sx={{ marginBottom: "5px" }}
                              variant="outlined"
                              value={answer.answerText}
                              onChange={(e) =>
                                handleAnswerTextChange(index, e.target.value)
                              }
                              required
                            />
                          }
                          checked={answer.isCorrect}
                          onChange={() => handleIsCorrectChange(index)}
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Typography variant="button">Submit</Typography>
                  )}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default DailyQuiz;
