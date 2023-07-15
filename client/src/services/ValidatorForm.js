import { errorMessage } from "../utils/AlertMessages";

export const ValidatorForm = (Schema, info, handler) => {
  Schema.validate(info)
    .then(() => {
      handler();
    })
    .catch((error) => {
        if (error.message.message) {
        errorMessage(error.message.message);
      } else {
        errorMessage(error.message);
      }
    });
};
