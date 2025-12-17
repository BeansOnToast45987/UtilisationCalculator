import { verifyToken, createClerkClient } from '@clerk/backend'
import { validateAuthRequest } from '../../validation/index'

const requireAuth = async (context: any): Promise<any> => {
  const authHeader = context.headers?.authorization
  const token = authHeader?.slice(7) || ''
  const secretKey = process.env.CLERK_SECRET_KEY

  validateAuthRequest(authHeader, token, secretKey)

  try {
    const auth = await verifyToken(token, {
      secretKey: secretKey!,
    })

    const clerkClient = createClerkClient({ secretKey: secretKey! })
    const user = await clerkClient.users.getUser(auth.sub)

    return {
      ...auth,
      privateMetadata: user.privateMetadata,
    }
  } catch (err) {
    throw new Error('Invalid or Expired Session. Please Sign in Again')
  }
}

export { requireAuth }
