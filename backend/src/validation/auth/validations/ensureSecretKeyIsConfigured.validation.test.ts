import { ensureSecretKeyIsConfigured } from './ensureSecretKeyIsConfigured.validation'

describe('ensureSecretKeyIsConfigured', () => {
  it('should pass when valid secret key is provided', () => {
    const validSecretKey = 'sk_test_1234567890abcdef'
    
    expect(() => ensureSecretKeyIsConfigured(validSecretKey)).not.toThrow()
  })

  it('should pass when secret key has special characters', () => {
    const validSecretKey = 'sk_live_abc123!@#$%^&*()'
    
    expect(() => ensureSecretKeyIsConfigured(validSecretKey)).not.toThrow()
  })

  it('should pass when secret key is very long', () => {
    const longSecretKey = 'sk_test_' + 'a'.repeat(100)
    
    expect(() => ensureSecretKeyIsConfigured(longSecretKey)).not.toThrow()
  })

  it('should pass when secret key has mixed case', () => {
    const mixedCaseKey = 'SK_Test_AbCdEf123456'
    
    expect(() => ensureSecretKeyIsConfigured(mixedCaseKey)).not.toThrow()
  })

  it('should throw error when secret key is undefined', () => {
    expect(() => ensureSecretKeyIsConfigured(undefined))
      .toThrow('Server Configuration Error. Please Contact Support')
  })

  it('should throw error when secret key is null', () => {
    expect(() => ensureSecretKeyIsConfigured(null as any))
      .toThrow('Server Configuration Error. Please Contact Support')
  })

  it('should throw error when secret key is empty string', () => {
    expect(() => ensureSecretKeyIsConfigured(''))
      .toThrow('Server Configuration Error. Please Contact Support')
  })

  it('should throw error when secret key is only whitespace', () => {
    expect(() => ensureSecretKeyIsConfigured('   '))
      .toThrow('Server Configuration Error. Please Contact Support')
  })

  it('should throw error when secret key is only tabs and spaces', () => {
    expect(() => ensureSecretKeyIsConfigured('\t\n   \r'))
      .toThrow('Server Configuration Error. Please Contact Support')
  })

  it('should throw error when secret key is single space', () => {
    expect(() => ensureSecretKeyIsConfigured(' '))
      .toThrow('Server Configuration Error. Please Contact Support')
  })
})