import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({ name: "React Native Demo" })
  .use(reactotronRedux()) //  <- here i am!
  .connect(); // let's connect!
export default reactotron;
