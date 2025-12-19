import { ensureClerkIdIsProvided } from "./ensureClerkIdIsProvided.validation";

describe("ensureClerkIdIsProvided", () => {
  it("should pass when valid clerkId is provided", () => {
    expect(() => ensureClerkIdIsProvided("user_123")).not.toThrow();
  });

  it("should pass when clerkId has special characters", () => {
    expect(() => ensureClerkIdIsProvided("user_abc-123_xyz")).not.toThrow();
  });

  it("should throw error when clerkId is undefined", () => {
    expect(() => ensureClerkIdIsProvided(undefined)).toThrow(
      "User Authentication ID is Required",
    );
  });

  it("should throw error when clerkId is null", () => {
    expect(() => ensureClerkIdIsProvided(null)).toThrow(
      "User Authentication ID is Required",
    );
  });

  it("should throw error when clerkId is empty string", () => {
    expect(() => ensureClerkIdIsProvided("")).toThrow(
      "User Authentication ID is Required",
    );
  });

  it("should throw error when clerkId is false", () => {
    expect(() => ensureClerkIdIsProvided(false)).toThrow(
      "User Authentication ID is Required",
    );
  });

  it("should throw error when clerkId is 0", () => {
    expect(() => ensureClerkIdIsProvided(0)).toThrow(
      "User Authentication ID is Required",
    );
  });

  it("should pass when clerkId is a number string", () => {
    expect(() => ensureClerkIdIsProvided("123")).not.toThrow();
  });

  it("should pass when clerkId has spaces", () => {
    expect(() => ensureClerkIdIsProvided("user 123")).not.toThrow();
  });
});
