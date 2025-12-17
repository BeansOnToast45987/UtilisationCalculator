import { ensureFullNameIsProvided } from './ensureFullNameIsProvided.validation'

describe('ensureFullNameIsProvided', () => {
  it('should pass when full name is provided', () => {
    expect(() => ensureFullNameIsProvided('John Doe')).not.toThrow()
  })

  it('should pass when name has multiple middle names', () => {
    expect(() => ensureFullNameIsProvided('John Michael Smith Doe')).not.toThrow()
  })

  it('should pass when name has special characters', () => {
    expect(() => ensureFullNameIsProvided("Mary O'Connor-Smith")).not.toThrow()
  })

  it('should pass when name has accents', () => {
    expect(() => ensureFullNameIsProvided('José María García')).not.toThrow()
  })

  it('should pass when name is single word', () => {
    expect(() => ensureFullNameIsProvided('Madonna')).not.toThrow()
  })

  it('should throw error when name is undefined', () => {
    expect(() => ensureFullNameIsProvided(undefined))
      .toThrow('Full Name is Required')
  })

  it('should throw error when name is null', () => {
    expect(() => ensureFullNameIsProvided(null))
      .toThrow('Full Name is Required')
  })

  it('should throw error when name is empty string', () => {
    expect(() => ensureFullNameIsProvided(''))
      .toThrow('Full Name is Required')
  })

  it('should throw error when name is false', () => {
    expect(() => ensureFullNameIsProvided(false))
      .toThrow('Full Name is Required')
  })
})