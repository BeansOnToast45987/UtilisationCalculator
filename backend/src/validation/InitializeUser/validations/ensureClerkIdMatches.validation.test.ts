import { ensureClerkIdMatches } from './ensureClerkIdMatches.validation'

describe('ensureClerkIdMatches', () => {
  it('should pass when clerk IDs match exactly', () => {
    expect(() => ensureClerkIdMatches('user_123', 'user_123')).not.toThrow()
  })

  it('should pass when both IDs are empty strings', () => {
    expect(() => ensureClerkIdMatches('', '')).not.toThrow()
  })

  it('should pass when IDs match with special characters', () => {
    expect(() => ensureClerkIdMatches('user_abc-123_xyz', 'user_abc-123_xyz')).not.toThrow()
  })

  it('should throw error when clerk IDs do not match', () => {
    expect(() => ensureClerkIdMatches('user_123', 'user_456'))
      .toThrow('Cannot Initialize User for Different Clerk ID')
  })

  it('should throw error when authenticated ID is different case', () => {
    expect(() => ensureClerkIdMatches('USER_123', 'user_123'))
      .toThrow('Cannot Initialize User for Different Clerk ID')
  })

  it('should throw error when input ID has extra spaces', () => {
    expect(() => ensureClerkIdMatches('user_123', ' user_123 '))
      .toThrow('Cannot Initialize User for Different Clerk ID')
  })

  it('should throw error when one ID is empty', () => {
    expect(() => ensureClerkIdMatches('user_123', ''))
      .toThrow('Cannot Initialize User for Different Clerk ID')
  })

  it('should throw error when authenticated ID is empty', () => {
    expect(() => ensureClerkIdMatches('', 'user_123'))
      .toThrow('Cannot Initialize User for Different Clerk ID')
  })
})