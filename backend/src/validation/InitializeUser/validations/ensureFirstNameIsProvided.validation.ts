const ensureFirstNameIsProvided = (firstName: any): void => {
  if (!firstName) {
    throw new Error('First Name is Required')
  }
}

export { ensureFirstNameIsProvided }
