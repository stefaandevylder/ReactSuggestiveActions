import { KNNClassifier } from "@tensorflow-models/knn-classifier";
import * as ts from "@tensorflow/tfjs";

/**
 * Generate the KNN classifier. This should be done only once in the application.
 */
const classifier = new KNNClassifier();

export default class SuggestiveActions {
  /**
   * Track an action as a suggestion.
   * @param {Tensor} action The action to track.
   * @param {string} userId The user id.
   */
  trackAction(userId: number, action: string, date: number) {
    classifier.addExample(ts.tensor([userId, date]), action);
  }

  /**
   * Predict an action based on the user id.
   * @param userId The user id.
   * @returns The predicted action.
   */
  predictAction(userId: number, date: number) {
    return classifier.predictClass(ts.tensor([userId, date]));
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
