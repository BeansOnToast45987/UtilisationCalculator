import { ensureAuthHeaderIsProvided } from './ensureAuthHeaderIsProvided.validation'

describe('ensureAuthHeaderIsProvided', () => {
  it('should pass when valid Bearer token is provided', () => {
    const validAuthHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    
    expect(() => ensureAuthHeaderIsProvided(validAuthHeader)).not.toThrow()
  })

  it('should pass when Bearer token has spaces after Bearer', () => {
    const validAuthHeader = 'Bearer   token123'
    
    expect(() => ensureAuthHeaderIsProvided(validAuthHeader)).not.toThrow()
  })

  it('should throw error when no auth header is provided', () => {
    expect(() => ensureAuthHeaderIsProvided(undefined))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })

  it('should throw error when auth header is null', () => {
    expect(() => ensureAuthHeaderIsProvided(null as any))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })

  it('should throw error when auth header does not start with Bearer', () => {
    expect(() => ensureAuthHeaderIsProvided('Basic token123'))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })

  it('should throw error when auth header is empty string', () => {
    expect(() => ensureAuthHeaderIsProvided(''))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })

  it('should throw error when auth header is only whitespace', () => {
    expect(() => ensureAuthHeaderIsProvided('   '))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })

  it('should throw error when auth header is just "Bearer" without token', () => {
    expect(() => ensureAuthHeaderIsProvided('Bearer'))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })

  it('should throw error when auth header has wrong case', () => {
    expect(() => ensureAuthHeaderIsProvided('bearer token123'))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })

  it('should throw error when auth header has different authentication scheme', () => {
    expect(() => ensureAuthHeaderIsProvided('Token abc123'))
      .toThrow('Authentication Required. Please Sign in to Continue')
  })
})