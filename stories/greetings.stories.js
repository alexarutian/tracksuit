import Greetings from "../components/greetings.js";
import { withReactContext } from "storybook-react-context";
import { AppContext } from "../contexts/appcontext.js";

export default {
  title: "greetings",
  decorators: [
    withReactContext({
      Context: AppContext,
      initialState: {
        currentProjectName: {
          value: "stupid crap",
        },
      },
    }),
  ],
  component: Greetings,
};

const Template = (args) => <Greetings {...args} />;

export const FirstStory = {
  args: {
    name: "Toon",
  },
};
