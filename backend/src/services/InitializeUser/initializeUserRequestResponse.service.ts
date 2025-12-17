import { InitializeUserResponse } from '../../types/index'

const initializeUserRequestResponse = (
  result: any,
  message: string
): InitializeUserResponse => {
  return {
    user: result.user,
    created: result.created,
    message,
  }
}

export { initializeUserRequestResponse }
