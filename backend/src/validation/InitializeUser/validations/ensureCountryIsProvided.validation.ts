const ensureCountryIsProvided = (country: any): void => {
  if (!country) {
    throw new Error('Country is Required')
  }
}

export { ensureCountryIsProvided }
