import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express4'
import bodyParser from 'body-parser'
import { typeDefs, resolvers } from './index'

configDotenv()

let isTestEnv = process.env.ENVIRONMENT === 'test'

if (!isTestEnv) {
  console.warn(
    '[WARNING] GraphQL Introspection is DISABLED. Set ENVIRONMENT to test to enable Introspection'
  )
}

export const createApp = async () => {
  const app = express()

  const corsOptions = {
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    accessControlAllowOrigin: '*',
    accessControlAllowCredentials: true,
    optionsSuccessStatus: 200,
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: isTestEnv,
    introspection: isTestEnv,
  })

  console.log('ENVIRONMENT =', process.env.ENVIRONMENT)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors(corsOptions))

  app.get('/health', (req, res) => {
    res
      .status(200)
      .json({ status: 'healthy', timestamp: new Date().toISOString() })
  })

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Utilisation Calculator API',
      environment: process.env.NODE_ENV || 'development',
      graphql: '/graphql',
    })
  })

  await server.start()

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        req,
        headers: req.headers,
      }),
    })
  )

  const port = process.env.PORT
  app.listen(port)
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  )
  if (isTestEnv) {
    console.log(
      `🚀 Running a GraphQL API Apollo Client at http://localhost:${port}/graphql`
    )
  }

  return app
}

createApp()
