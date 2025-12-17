import { initializeUserRequestResponse } from './initializeUserRequestResponse.service'
import { Country } from '../../types/index'

describe('initializeUserRequestResponse', () => {
  const mockUser = {
    id: '1',
    clerkId: 'user_123',
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    country: Country.GB,
    createdAt: new Date()
  }

  it('should format response for newly created user', () => {
    const result = { user: mockUser, created: true }
    const message = 'User Successfully Created'

    const response = initializeUserRequestResponse(result, message)

    expect(response).toEqual({
      user: mockUser,
      created: true,
      message: 'User Successfully Created'
    })
  })

  it('should format response for existing user', () => {
    const result = { user: mockUser, created: false }
    const message = 'User Already Exists'

    const response = initializeUserRequestResponse(result, message)

    expect(response).toEqual({
      user: mockUser,
      created: false,
      message: 'User Already Exists'
    })
  })

  it('should handle custom messages', () => {
    const result = { user: mockUser, created: true }
    const customMessage = 'Custom success message'

    const response = initializeUserRequestResponse(result, customMessage)

    expect(response).toEqual({
      user: mockUser,
      created: true,
      message: 'Custom success message'
    })
  })

  it('should preserve user data structure', () => {
    const userWithExtraFields = {
      ...mockUser,
      extraField: 'should be preserved'
    }
    const result = { user: userWithExtraFields, created: false }
    const message = 'Test message'

    const response = initializeUserRequestResponse(result, message)

    expect(response.user).toEqual(userWithExtraFields)
    expect(response.created).toBe(false)
    expect(response.message).toBe('Test message')
  })

  it('should handle different country values in user data', () => {
    const frenchUser = { ...mockUser, country: Country.FR }
    const result = { user: frenchUser, created: true }
    const message = 'French user created'

    const response = initializeUserRequestResponse(result, message)

    expect(response.user.country).toBe(Country.FR)
    expect(response.created).toBe(true)
    expect(response.message).toBe('French user created')
  })
})