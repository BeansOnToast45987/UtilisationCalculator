import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
})

const authLink = setContext(async (_, { headers }) => {
  let token = null

  try {
    const clerk = (window as any).Clerk
    if (clerk?.session) {
      token = await clerk.session.getToken()
    }
  } catch (error) {
    console.error('Error getting Clerk token:', error)
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const Client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
})

export default Client
