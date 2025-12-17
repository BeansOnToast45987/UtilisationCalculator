const ensureAuthHeaderIsProvided = (authHeader: string | undefined): void => {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Authentication Required. Please Sign in to Continue')
  }
}

export { ensureAuthHeaderIsProvided }
