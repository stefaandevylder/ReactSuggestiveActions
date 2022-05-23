import { useState } from "react";
import { DateTime } from "luxon";
import SuggestiveActions from "./SuggestiveActions";

/**
 * Only need to initialize the suggestive actions once.
 */
const suggestiveActions = new SuggestiveActions();

/**
 * We currently hardcode the user id.
 */
const USER_ID = 1;

/**
 * Lets say the current date it the start of the week.
 * This way the prototype can be better presented.
 */
const CURRENT_DATE = DateTime.now().startOf("week");

interface Action {
  date: string;
  label: string;
}

interface Prediction {
  label: string;
  classIndex: number;
  confidences: {
    [label: string]: number;
  };
}

const App = () => {
  const [currentDate, setCurrentDate] = useState(CURRENT_DATE);
  const [allowPredictions, setAllowPredictions] = useState(false);
  const [actionsByWeek, setActionsByWeek] = useState([] as Action[]);
  const [prediction, setPrediction] = useState<Prediction>();

  const onNextDayHandler = () => {
    setCurrentDate((date) => date.plus({ days: 1 }));
    setPrediction(undefined);

    if (currentDate.diff(CURRENT_DATE, "days").toObject().days! > 6) {
      setAllowPredictions(true);
    }
  };

  const currentWeekToInteger = () => {
    return parseInt(currentDate.toFormat("E"));
  };

  const trackButtonClickAction = (action: string) => {
    setActionsByWeek((actions) => [
      ...actions,
      {
        date: currentDate.toFormat("EEEE"),
        label: action,
      },
    ]);
    suggestiveActions.trackAction(USER_ID, action, currentWeekToInteger());
  };

  const logSuggestedAction = () => {
    suggestiveActions
      .predictAction(
        USER_ID,
        parseInt(currentDate.plus({ days: 1 }).toFormat("E"))
      )
      .then((result) => setPrediction(result));
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "arial" }}>
      <div>
        <h1>This is a prototype for Stefaan De Vylder's bachelor's thesis.</h1>
        <h4>
          The prototype shows an exmaple on how to implement machine learning in
          a front-end application.
        </h4>
      </div>
      <div style={{ marginTop: "50px" }}>
        <h3>Current day: {currentDate.toFormat("EEEE")}</h3>
        <p>
          You have to select at least one action per day to train the AI model.
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <button onClick={() => trackButtonClickAction("Add an invoice")}>
            Add an invoice
          </button>
          <button onClick={() => trackButtonClickAction("Call new client")}>
            Call new client
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <button onClick={() => trackButtonClickAction("Add a client")}>
            Add a client
          </button>
          <button onClick={() => trackButtonClickAction("Open the mailbox")}>
            Open the mailbox
          </button>
        </div>
      </div>
      <div>
        <button onClick={onNextDayHandler}>Next day</button>
      </div>

      {allowPredictions && (
        <div style={{ marginTop: "30px" }}>
          <button
            onClick={logSuggestedAction}
            style={{ backgroundColor: "lightgreen" }}
          >
            Make prediction for the next day
          </button>
        </div>
      )}

      {prediction && (
        <div style={{ marginTop: "30px" }}>
          <b>
            Prediction for {currentDate.plus({ days: 1 }).toFormat("EEEE")}:{" "}
          </b>
          <span>{prediction.label}</span>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        {actionsByWeek.length > 0 &&
          actionsByWeek.map((action, index) => (
            <div key={index}>
              <b>{action.date}: </b>
              <span>{action.label}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
