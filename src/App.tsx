import SuggestiveActions from "./SuggestiveActions";

/**
 * Lets keep this user ID 1 for now.
 */
const USER_ID = 1;

const App = () => {
  const suggestiveActions = new SuggestiveActions();

  const trackButtonClickAction = (buttonId: number) => {
    suggestiveActions.trackAction(`button-${buttonId}`, USER_ID);
  };

  const logSuggestedAction = () => {
    suggestiveActions.predictAction(1).then((result) => console.warn(result));
    console.log(suggestiveActions.getActions());
  };

  return (
    <div>
      <button onClick={() => trackButtonClickAction(1)}>Button 1</button>
      <button onClick={() => trackButtonClickAction(2)}>Button 2</button>
      <button onClick={() => trackButtonClickAction(3)}>Button 3</button>
      <button onClick={() => trackButtonClickAction(4)}>Button 4</button>
      <button onClick={() => trackButtonClickAction(5)}>Button 5</button>
      <button onClick={() => trackButtonClickAction(6)}>Button 6</button>
      <button onClick={() => trackButtonClickAction(7)}>Button 7</button>
      <button onClick={() => trackButtonClickAction(8)}>Button 8</button>
      <button onClick={() => trackButtonClickAction(9)}>Button 9</button>
      <button onClick={logSuggestedAction}>Predict next press</button>
    </div>
  );
};

export default App;
