import { KNNClassifier } from "@tensorflow-models/knn-classifier";
import * as ts from "@tensorflow/tfjs";

/**
 * Generate the KNN classifier. This should be done only once in the application.
 */
const classifier = new KNNClassifier();

/**
 * We are only getting the seconds, in productions this would be the current time.
 * @returns The current seconds
 */
const getTimeAsInteger = () => {
  let date = new Date();
  return date.getSeconds();
};

export default class SuggestiveActions {
  /**
   * Track an action as a suggestion.
   * @param {Tensor} action The action to track.
   * @param {string} userId The user id.
   */
  trackAction(action: string, userId: number) {
    classifier.addExample(ts.tensor([userId, getTimeAsInteger()]), action);
  }

  /**
   * Predict an action based on the user id.
   * @param userId The user id.
   * @returns The predicted action.
   */
  predictAction(userId: number) {
    return classifier.predictClass(ts.tensor([userId, getTimeAsInteger()]));
  }

  /**
   * Get the actions.
   */
  getActions() {
    return classifier.getClassifierDataset();
  }

  /**
   * Set the actions from a source.
   */
  setActions(source: any) {
    classifier.setClassifierDataset(source);
  }
}
