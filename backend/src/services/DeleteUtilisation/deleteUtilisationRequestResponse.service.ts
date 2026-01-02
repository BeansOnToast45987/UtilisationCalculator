import { DeleteUtilisationResponse } from "../../types/index";

const deleteUtilisationRequestResponse = (result: {
  id: string;
}): DeleteUtilisationResponse => {
  return {
    id: result.id,
    message: "Calculation successfully deleted",
  };
};

export { deleteUtilisationRequestResponse };
