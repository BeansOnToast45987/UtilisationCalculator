import { ensureCountryIsValidEnum } from './ensureCountryIsValidEnum.validation'

describe('ensureCountryIsValidEnum', () => {
  it('should pass when country is GB', () => {
    expect(() => ensureCountryIsValidEnum('GB')).not.toThrow()
  })

  it('should pass when country is FR', () => {
    expect(() => ensureCountryIsValidEnum('FR')).not.toThrow()
  })

  it('should throw error when country is invalid', () => {
    expect(() => ensureCountryIsValidEnum('US'))
      .toThrow('Invalid Country. Must be One of: GB, FR')
  })

  it('should throw error when country is lowercase', () => {
    expect(() => ensureCountryIsValidEnum('gb'))
      .toThrow('Invalid Country. Must be One of: GB, FR')
  })

  it('should throw error when country is mixed case', () => {
    expect(() => ensureCountryIsValidEnum('Gb'))
      .toThrow('Invalid Country. Must be One of: GB, FR')
  })

  it('should throw error when country is empty string', () => {
    expect(() => ensureCountryIsValidEnum(''))
      .toThrow('Invalid Country. Must be One of: GB, FR')
  })

  it('should throw error when country is numeric', () => {
    expect(() => ensureCountryIsValidEnum('123'))
      .toThrow('Invalid Country. Must be One of: GB, FR')
  })

  it('should throw error when country has extra characters', () => {
    expect(() => ensureCountryIsValidEnum('GBR'))
      .toThrow('Invalid Country. Must be One of: GB, FR')
  })
})