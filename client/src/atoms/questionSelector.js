import { atom, selector } from "recoil";

export const questionState = atom({
  key: "questionState",
  default: "strength",
});

export const questionSelector = selector({
  key: "questionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    let getQL;
    switch (questionCondition) {
      case "strength":
        getQL = (tweetText) => {
          return `To what extent does the quoted news headline support ${tweetText.name}'s conclusion?`;
        };
        return getQL;

        break;
      case "share":
        getQL = (tweetText) => {
          return `Would you consider sharing ${tweetText.name}'s tweet on social media (for example Twitter or Facebook)?`;
        };
        return getQL;
        break;
    }
  },
});

export const qualQuestionSelector = selector({
  key: "qualQuestionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    let getQL;
    switch (questionCondition) {
      case "strength":
        getQL = (tweetText) => {
          return `You can see your response for "how strong the quoted news headline supports ${tweetText.name}'s conclusion?" below:`;
        };
        return getQL;

        break;
      case "share":
        getQL = (tweetText) => {
          return `You can see your response for "Would you consider sharing ${tweetText.name}'s tweet on social media?" below:`;
        };
        return getQL;
        break;
    }
  },
});

export const labelSelector = selector({
  key: "labelQuestionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    switch (questionCondition) {
      case "share":
        // return [
        //   "Not likely at all",
        //   "Slightly likely",
        //   "Moderately Likely",
        //   "Completely likely",
        // ];
        return ["No", "Slightly", "Moderately", "Strongly"];
        break;
      case "strength":
        return [
          "Does not support",
          "Slightly supports",
          "Moderately supports",
          "Strongly supports",
        ];

        break;
    }
  },
});

// export { questionState, questionSelector };
