import { ensureFirstNameIsProvided } from './ensureFirstNameIsProvided.validation'

describe('ensureFirstNameIsProvided', () => {
  it('should pass when firstName is provided', () => {
    expect(() => ensureFirstNameIsProvided('John')).not.toThrow()
  })

  it('should pass when firstName has multiple words', () => {
    expect(() => ensureFirstNameIsProvided('Mary Jane')).not.toThrow()
  })

  it('should pass when firstName has special characters', () => {
    expect(() => ensureFirstNameIsProvided("O'Connor")).not.toThrow()
  })

  it('should pass when firstName has accents', () => {
    expect(() => ensureFirstNameIsProvided('José')).not.toThrow()
  })

  it('should throw error when firstName is undefined', () => {
    expect(() => ensureFirstNameIsProvided(undefined))
      .toThrow('First Name is Required')
  })

  it('should throw error when firstName is null', () => {
    expect(() => ensureFirstNameIsProvided(null))
      .toThrow('First Name is Required')
  })

  it('should throw error when firstName is empty string', () => {
    expect(() => ensureFirstNameIsProvided(''))
      .toThrow('First Name is Required')
  })

  it('should throw error when firstName is false', () => {
    expect(() => ensureFirstNameIsProvided(false))
      .toThrow('First Name is Required')
  })

  it('should pass when firstName is a single character', () => {
    expect(() => ensureFirstNameIsProvided('J')).not.toThrow()
  })
})