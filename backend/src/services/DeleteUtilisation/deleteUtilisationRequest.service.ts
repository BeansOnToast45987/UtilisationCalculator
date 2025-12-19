import { prisma } from "../../utils/index";
import { DeleteUtilisationInput } from "../../types/index";

const deleteUtilisationRequest = async (
  input: DeleteUtilisationInput,
  clerkId: string,
): Promise<{ id: string }> => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  const calculation = await prisma.utilisationCalculation.findUnique({
    where: { id: input.id },
  });

  if (!calculation) {
    throw new Error("Calculation Not Found");
  }

  if (calculation.userId !== user.id) {
    throw new Error("You Do Not Own This Calculation");
  }

  await prisma.utilisationCalculation.delete({
    where: { id: input.id },
  });

  return { id: input.id };
};

export { deleteUtilisationRequest };
