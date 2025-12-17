import { ensureCountryIsProvided } from './ensureCountryIsProvided.validation'

describe('ensureCountryIsProvided', () => {
  it('should pass when country is provided as string', () => {
    expect(() => ensureCountryIsProvided('GB')).not.toThrow()
  })

  it('should pass when country is provided with different case', () => {
    expect(() => ensureCountryIsProvided('gb')).not.toThrow()
  })

  it('should pass when country has multiple characters', () => {
    expect(() => ensureCountryIsProvided('USA')).not.toThrow()
  })

  it('should throw error when country is undefined', () => {
    expect(() => ensureCountryIsProvided(undefined))
      .toThrow('Country is Required')
  })

  it('should throw error when country is null', () => {
    expect(() => ensureCountryIsProvided(null))
      .toThrow('Country is Required')
  })

  it('should throw error when country is empty string', () => {
    expect(() => ensureCountryIsProvided(''))
      .toThrow('Country is Required')
  })

  it('should throw error when country is false', () => {
    expect(() => ensureCountryIsProvided(false))
      .toThrow('Country is Required')
  })

  it('should throw error when country is 0', () => {
    expect(() => ensureCountryIsProvided(0))
      .toThrow('Country is Required')
  })

  it('should pass when country is a single character', () => {
    expect(() => ensureCountryIsProvided('A')).not.toThrow()
  })
})