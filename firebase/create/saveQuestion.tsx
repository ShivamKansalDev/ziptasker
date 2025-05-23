import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { verifyAuth } from "../authCheck/verifyAuth";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";
import { checkInternetConnectivity } from "../../netInfo";
import { QuestionDetailsProps } from "../../screens/AuthStack/MyTasksStack/MyTaskDetails";
import { store } from "../../redux/store";
import { tasksActions } from "../../redux/slice/tasks";
import moment from "moment";

export const defaultUserImage =
  "https://firebasestorage.googleapis.com/v0/b/taskermanager.appspot.com/o/images%2Fdefault%2Fuser.png?alt=media&token=4e9569fc-c551-4e3e-a231-a8f02ee3f21a";

export let preloadImages = [defaultUserImage];

export const saveQuestionToFirebase = async (
  details: QuestionDetailsProps
): Promise<FirebaseFirestoreTypes.DocumentReference> => {
  try {
    const { isConnected } = await checkInternetConnectivity();
    if (!isConnected) {
      return Promise.reject(`No Internet.`);
    }
    const isAuthenticated = verifyAuth();
    const user = auth().currentUser;
    const userId = auth().currentUser?.uid;
    if (!isAuthenticated || !userId) {
      return Promise.reject(
        new Error("User not authenticated or userId is missing.")
      );
    }
    store.dispatch(tasksActions.setLoading(true));
    const commentRef = firestore()
      .collection("tasks")
      .doc(details.task_id)
      .collection("questions");
    const newComment: QuestionDetailsProps = {
      ...details,
      createdAt: moment().valueOf(),
    };
    console.log("@@@ SAVE QUESTION: ", newComment);
    const docRef = await commentRef.add(newComment);
    store.dispatch(tasksActions.setLoading(false));
    return docRef;
  } catch (error) {
    store.dispatch(tasksActions.setLoading(false));
    return Promise.reject(new Error(`Save comment failed: ${error}`));
  }
};
