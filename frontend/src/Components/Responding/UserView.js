import React from "react";

import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";

import formService from "../../services/formService";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import auth from "../../services/authService";
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function UserView(props) {
  const classes = useStyles();
  const history = useHistory();

  const [userId, setUserId] = React.useState("");
  const [userobj, setUserobj] = React.useState({});
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  //console.log(responseData);

  const [optionValue, setOptionValue] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [questions, setQuestions] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [questionvalues, setQuestionvalues] = React.useState(
    new Array(100).fill(" ")
  );
  // let questionvalues = ;
  //console.log(value);
  React.useEffect(() => {
    if (auth.isAuthenticated()) {
      var userr = auth.getCurrentUser();
      console.log(userr.id);
      console.log(userr);
      setUserId(userr.id);
      setUserobj({ name: userr.name, email: userr.email });
    } else {
      toast("you have to be logged in to fill the form");
      history.push("/login");
    }
  }, []);

  const handleRadioChange = (j, i) => {
    var questionId = questions[i]._id;
    var optionId = questions[i].options[j]._id;

    var fakeData = {
      question: i,
      option: j,
    };
    var data = {
      questionId,
      optionId,
    };
    //  console.log(data);
    //console.log(fakeData);
    // console.log(j);
    var dup = questionvalues;
    dup[i] = parseInt(j);
    // questionvalues[i] = j;
    setQuestionvalues(dup);
    setValue(j);
    console.log(
      questionvalues,
      questionvalues.length,
      typeof questionvalues[0]
    );

    var fakeRData = [...responseData];

    var indexOfResponse = fakeRData.findIndex(
      (x) => x.questionId === questionId
    );
    if (indexOfResponse === -1) {
      setResponseData((responseData) => [...responseData, data]);
    } else {
      fakeRData[indexOfResponse].questionId = questionId;
      setResponseData(fakeRData);
    }

    // setOptionValue(fakeData);
    //
  };

  React.useEffect(() => {
    var formId = props.match.params.formId;
    console.log(formId);

    formService.getForm(formId).then(
      (data) => {
        console.log(data);

        setFormData(data);
        setQuestions(data.questions);
        //questionvalues = new Array(data.questions.length);
        // for (let i = 0; i < data.questions.length; i++) {
        //   questionvalues[i] = 0;
        // }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }, [props.match.params.formId]);

  function submitResponse() {
    var submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData,
    };
    console.log(submissionData);

    formService.submitResponse(submissionData).then(
      (data2) => {
        setIsSubmitted(true);
        console.log(data2);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  let displayContent = (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <AppBar position="static" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{}}>
              Altura Forms
            </Typography>
          </Toolbar>
        </AppBar>
        <br></br>

        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
              <div>
                <div>
                  <Paper elevation={2} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: "sans-serif Roboto",
                          marginBottom: "15px",
                        }}
                      >
                        {formData.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {formData.description}
                      </Typography>
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {!isSubmitted ? (
              <div>
                <Grid>
                  {questions.map((ques, i) => (
                    <div key={i}>
                      <br></br>
                      <Paper>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "6px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ marginLeft: "10px" }}
                            >
                              {i + 1}. {ques.questionText}
                            </Typography>

                            {ques.questionImage !== "" ? (
                              <div>
                                <img
                                  src={ques.questionImage}
                                  width="80%"
                                  height="auto"
                                />
                                <br></br>
                                <br></br>
                              </div>
                            ) : (
                              ""
                            )}

                            <div>
                              <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={questionvalues[i]}
                                onChange={(e) => {
                                  handleRadioChange(e.target.value, i);
                                }}
                              >
                                {ques.options.map((op, j) => (
                                  <div key={j}>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "7px",
                                      }}
                                    >
                                      <FormControlLabel
                                        value={j}
                                        control={<Radio />}
                                        label={op.optionText}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {op.optionImage !== "" ? (
                                        <img
                                          src={op.optionImage}
                                          width="64%"
                                          height="auto"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <Divider />
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitResponse}
                    >
                      Submit
                    </Button>
                  </div>
                  <br></br>

                  <br></br>
                </Grid>
              </div>
            ) : (
              <Redirect
                to={{
                  pathname: "/payment",
                  state: {
                    userid: userId,
                    name: userobj.name,
                    email: userobj.email,
                    phone: "",
                  },
                }}
              />
            )}
          </Grid>
        </Grid>

        {/* //TODO: Add a footer here */}
      </div>
    </div>
  );

  return questionvalues !== null ? displayContent : <h1>loading</h1>;
}

export default UserView;

const FormControlLabelWrapper = (props) => {
  const { radioButton, ...labelProps } = props;
  return (
    <FormControlLabel
      control={<Radio />}
      label={"Radio " + props.value + props.jIndex}
      {...labelProps}
    />
  );
};

//  <div>
//                 <Typography variant='body1'>Form submitted</Typography>
//                 <Typography variant='body2'>
//                   Thanks for submiting form
//                 </Typography>

//                 <Button onClick={reloadForAnotherResponse}>
//                   Submit another response
//                 </Button>
//               </div>
