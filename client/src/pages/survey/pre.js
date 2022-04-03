import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

const PreSurveyPage = (props) => {
  const history = useHistory();
  const json = {
    elements: [
      {
        type: "radiogroup",
        name: "gender",
        title: "What is your gender?",
        isRequired: true,
        colCount: 1,
        choices: ["Female", "Male", "Other", "Prefer not to say"],
      },
      {
        type: "radiogroup",
        name: "race",
        title: "What is your race/ethnicity?",
        isRequired: true,
        hasNone: true,
        colCount: 2,
        choices: [
          "White/Caucasian/European",
          "African American/Black",
          "Native American",
          "Hispanic/Latino",
          "East Asian e.g. Chinese, Japanese, South-East Asian",
          "Indian, Pakistani, Bangladeshi, or any other Asian",
          "Middle Eastern",
          "Pacific Islander",
          "Australian Aboriginal",
        ],
      },
      {
        type: "radiogroup",
        name: "education",
        title: "What is your education?",
        isRequired: true,
        colCount: 1,
        choices: [
          "High School",
          "Undergraduate",
          "Masters",
          "Doctorate",
          "other",
          "Prefer not to say",
        ],
      },
      {
        name: "age",
        type: "text",
        inputType: "number",
        title: "What is your age?",
        isRequired: true,
      },
    ],
  };
  var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
  defaultThemeColors["$main-color"] = "black";
  defaultThemeColors["$main-hover-color"] = "lightgrey";
  defaultThemeColors["$text-color"] = "#4a4a4a";
  defaultThemeColors["$header-color"] = "#7ff07f";

  defaultThemeColors["$header-background-color"] = "#4a4a4a";
  defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

  Survey.StylesManager.applyTheme();

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/preq", survey.data).then((response) => {
      history.push("/instructions1");
    });
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        paddingBottm: "30px",
      }}
    >
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default PreSurveyPage;
