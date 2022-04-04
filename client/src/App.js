import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataState } from "./atoms/data";
import { responseState } from "./atoms/response";
import { answerIndexState } from "./atoms/answerIndex";
import { qualResponseState } from "./atoms/qualResponseIndex";
import NavBar from "./components/nav/nav";
import Container from "@mui/material/Container";
import BottomNav from "./components/bottomNav/bottomNav";
//pages
import Task from "./pages/study/task";
import QualTask from "./pages/study/task_qual";
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import CogRefSurveyPage from "./pages/survey/cogRef";
import ConsentPage from "./pages/consent/consent";
import DebriefPage from "./pages/debrief/debrief";
import Instructions1 from "./pages/instructions/instruction1";
import Instructions2 from "./pages/instructions/instructions2";
//pages
import LoadingCircle from "./components/loading/loading";
import { shuffle } from "./functions/functions";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import "./App.css";

const App = () => {
  const [data, setData] = useRecoilState(dataState);
  const [response, setResponse] = useRecoilState(responseState);
  const [answerIndex, setAnswerIndex] = useRecoilState(answerIndexState);
  const [qualResponseIndex, setQualResponseIndex] =
    useRecoilState(qualResponseState);

  const [loadingOpacity, setLoadingOpacity] = useState(0);

  useEffect(() => {
    const localStorage = window.localStorage;
    const sessionResponse = localStorage.getItem("response");
    const sessionAnswerIndex = localStorage.getItem("answerIndex");
    const sessionQualResponseIndex = localStorage.getItem("qualResponseIndex");
    if (sessionResponse !== null) {
      setResponse(JSON.parse(sessionResponse));
      console.log(sessionResponse);
    }
    if (sessionAnswerIndex !== null) {
      setAnswerIndex(+sessionAnswerIndex);
      console.log("session answer index", sessionAnswerIndex);
    }
    if (sessionQualResponseIndex !== null) {
      setQualResponseIndex(+sessionQualResponseIndex);
      console.log("qual response index", sessionQualResponseIndex);
    }
  }, []);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("response", JSON.stringify(response));
    }
  }, [response]);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("answerIndex", answerIndex);
    }
  }, [answerIndex]);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("qualResponseIndex", qualResponseIndex);
    }
  }, [qualResponseIndex]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/data");
      setTimeout(() => {
        console.log(result.data);
        // let shuffledData = [shuffle(result.data[0]), shuffle(result.data[1])];
        let shuffledData = [
          shuffle(result.data[0].slice(0, 4)),
          shuffle(result.data[1].slice(0, 4)),
        ];
        // FOR DEV

        // FOR DEV
        window.localStorage.setItem("data", JSON.stringify(shuffledData));
        setData(shuffledData);
      }, 1000);
    }
    window.localStorage.clear();
    const sessionData = window.localStorage.getItem("data");
    if (sessionData !== null) {
      setData(JSON.parse(sessionData));
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="app" style={{ height: "100%", lineHeight: "150%" }}>
      <Router>
        <NavBar height={"7%"} className="navBar"></NavBar>
        <Container
          style={{ height: "86%", margin: "0 auto", width: "100%" }}
          id="root-container"
        >
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/consent" />;
              }}
            />
            <Route path="/consent">
              <ConsentPage></ConsentPage>
            </Route>
            <Route path="/pre" component={PreSurveyPage}></Route>
            <Route path="/instructions1">
              <Instructions1></Instructions1>
            </Route>
            <Route path="/instructions2">
              <Instructions2></Instructions2>
            </Route>
            <Route path="/task1">
              <Task
                phase={0}
                opacity={loadingOpacity}
                setLoadingOpacity={setLoadingOpacity}
              ></Task>
            </Route>
            <Route path="/cogref" component={CogRefSurveyPage}></Route>
            <Route path="/task2">
              <Task
                phase={1}
                opacity={loadingOpacity}
                setLoadingOpacity={setLoadingOpacity}
              ></Task>
            </Route>
            <Route path="/task3">
              <QualTask
                opacity={loadingOpacity}
                setLoadingOpacity={setLoadingOpacity}
              ></QualTask>
            </Route>

            <Route path="/post" component={PostSurveyPage}></Route>
            <Route path="/debrief">
              <DebriefPage></DebriefPage>
            </Route>
          </Switch>
        </Container>
        <BottomNav height="7%"></BottomNav>
      </Router>
      <LoadingCircle opacity={loadingOpacity}></LoadingCircle>
    </div>
  );
};

export default App;
