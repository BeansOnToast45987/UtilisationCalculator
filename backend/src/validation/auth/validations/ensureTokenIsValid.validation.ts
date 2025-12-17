const ensureTokenIsValid = (token: string): void => {
  if (!token || token.trim() === '') {
    throw new Error('Invalid Authentication Token. Please Sign in to Continue')
  }
}

export { ensureTokenIsValid }
