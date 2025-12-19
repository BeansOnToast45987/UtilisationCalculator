const ensureTargetUtilisationIsValid = (targetUtilisation: number): void => {
  if (targetUtilisation === undefined || targetUtilisation === null) {
    throw new Error('Target Utilisation is Required')
  }

  if (typeof targetUtilisation !== 'number') {
    throw new Error('Target Utilisation Must be a Number')
  }

  if (targetUtilisation < 1 || targetUtilisation > 100) {
    throw new Error('Target Utilisation Must be Between 1 and 100')
  }
}

export { ensureTargetUtilisationIsValid }
