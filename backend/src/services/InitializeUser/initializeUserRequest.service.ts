import { prisma } from '../../utils/index'
import { InitializeUserInput } from '../../types/index'

const initializeUserRequest = async (input: InitializeUserInput) => {
  const { clerkId, firstName, lastName, name, country } = input

  const existingUser = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (existingUser) {
    return {
      user: existingUser,
      created: false,
    }
  }

  try {
    const user = await prisma.user.create({
      data: { clerkId, firstName, lastName, name, country },
    })

    return { user, created: true }
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('clerkId')) {
      const raceConditionUser = await prisma.user.findUnique({
        where: { clerkId },
      })

      if (raceConditionUser) {
        return {
          user: raceConditionUser,
          created: false,
        }
      }
    }
    throw error
  }
}

export { initializeUserRequest }
