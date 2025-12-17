const ensureFullNameIsProvided = (name: any): void => {
  if (!name) {
    throw new Error('Full Name is Required')
  }
}

export { ensureFullNameIsProvided }
