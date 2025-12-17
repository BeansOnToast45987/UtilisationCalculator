import { ensureTokenIsValid } from './ensureTokenIsValid.validation'

describe('ensureTokenIsValid', () => {
  it('should pass when valid JWT token is provided', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    
    expect(() => ensureTokenIsValid(validToken)).not.toThrow()
  })

  it('should pass when token is a simple string', () => {
    const simpleToken = 'abc123def456'
    
    expect(() => ensureTokenIsValid(simpleToken)).not.toThrow()
  })

  it('should pass when token has special characters', () => {
    const tokenWithSpecialChars = 'token-with_special.chars123'
    
    expect(() => ensureTokenIsValid(tokenWithSpecialChars)).not.toThrow()
  })

  it('should pass when token is very long', () => {
    const longToken = 'a'.repeat(1000)
    
    expect(() => ensureTokenIsValid(longToken)).not.toThrow()
  })

  it('should pass when token has numbers only', () => {
    const numericToken = '123456789'
    
    expect(() => ensureTokenIsValid(numericToken)).not.toThrow()
  })

  it('should throw error when token is empty string', () => {
    expect(() => ensureTokenIsValid(''))
      .toThrow('Invalid Authentication Token. Please Sign in to Continue')
  })

  it('should throw error when token is only whitespace', () => {
    expect(() => ensureTokenIsValid('   '))
      .toThrow('Invalid Authentication Token. Please Sign in to Continue')
  })

  it('should throw error when token is only tabs and newlines', () => {
    expect(() => ensureTokenIsValid('\t\n\r'))
      .toThrow('Invalid Authentication Token. Please Sign in to Continue')
  })

  it('should throw error when token is single space', () => {
    expect(() => ensureTokenIsValid(' '))
      .toThrow('Invalid Authentication Token. Please Sign in to Continue')
  })

  it('should throw error when token is multiple spaces', () => {
    expect(() => ensureTokenIsValid('     '))
      .toThrow('Invalid Authentication Token. Please Sign in to Continue')
  })

  it('should throw error when token is mixed whitespace', () => {
    expect(() => ensureTokenIsValid(' \t \n '))
      .toThrow('Invalid Authentication Token. Please Sign in to Continue')
  })
})