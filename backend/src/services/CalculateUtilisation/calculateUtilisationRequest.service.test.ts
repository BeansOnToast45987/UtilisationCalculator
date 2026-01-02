import { calculateUtilisationRequest } from "./calculateUtilisationRequest.service";

jest.mock("../../utils/index");

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
  },
  utilisationCalculation: {
    create: jest.fn(),
  },
} as any;

(require("../../utils/index") as any).prisma = mockPrisma;

describe("calculateUtilisationRequest", () => {
  const mockInput = {
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    totalHours: 160,
    billableHours: 120,
    targetUtilisation: 75,
  };

  const mockUser = {
    id: "user_id_123",
    clerkId: "user_123",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    country: "GB",
    createdAt: new Date(),
  };

  const mockCalculation = {
    id: "calc_123",
    userId: "user_id_123",
    totalHours: 160,
    billableHours: 120,
    targetUtilisation: 75,
    calculatedUtilisation: 75.0,
    meetsTarget: true,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully calculate and store utilisation", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);
    mockPrisma.utilisationCalculation.create.mockResolvedValue(mockCalculation);

    const result = await calculateUtilisationRequest(mockInput, "user_123");

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "user_123" },
    });
    expect(mockPrisma.utilisationCalculation.create).toHaveBeenCalledWith({
      data: {
        userId: "user_id_123",
        totalHours: 160,
        billableHours: 120,
        targetUtilisation: 75,
        calculatedUtilisation: 75.0,
        meetsTarget: true,
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-31"),
      },
    });
    expect(result).toEqual({
      id: "calc_123",
      userId: "user_id_123",
      totalHours: 160,
      billableHours: 120,
      targetUtilisation: 75,
      calculatedUtilisation: 75.0,
      meetsTarget: true,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
      createdAt: mockCalculation.createdAt,
    });
  });

  it("should throw error when user not found", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(
      calculateUtilisationRequest(mockInput, "nonexistent_user"),
    ).rejects.toThrow("User Not Found");

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "nonexistent_user" },
    });
    expect(mockPrisma.utilisationCalculation.create).not.toHaveBeenCalled();
  });

  it("should throw error when total hours is zero", async () => {
    const zeroHoursInput = { ...mockInput, totalHours: 0 };
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    await expect(
      calculateUtilisationRequest(zeroHoursInput, "user_123"),
    ).rejects.toThrow("Total Hours Cannot be Zero");

    expect(mockPrisma.utilisationCalculation.create).not.toHaveBeenCalled();
  });

  it("should handle perfect utilisation calculation", async () => {
    const perfectInput = {
      ...mockInput,
      billableHours: 160,
      targetUtilisation: 100,
    };
    const perfectCalculation = {
      ...mockCalculation,
      billableHours: 160,
      targetUtilisation: 100,
      calculatedUtilisation: 100.0,
      meetsTarget: true,
    };

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);
    mockPrisma.utilisationCalculation.create.mockResolvedValue(
      perfectCalculation,
    );

    const result = await calculateUtilisationRequest(perfectInput, "user_123");

    expect(mockPrisma.utilisationCalculation.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        calculatedUtilisation: 100.0,
        meetsTarget: true,
      }),
    });
    expect(result.calculatedUtilisation).toBe(100.0);
    expect(result.meetsTarget).toBe(true);
  });

  it("should handle low utilisation not meeting target", async () => {
    const lowInput = { ...mockInput, billableHours: 80, targetUtilisation: 75 };
    const lowCalculation = {
      ...mockCalculation,
      billableHours: 80,
      calculatedUtilisation: 50.0,
      meetsTarget: false,
    };

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);
    mockPrisma.utilisationCalculation.create.mockResolvedValue(lowCalculation);

    const result = await calculateUtilisationRequest(lowInput, "user_123");

    expect(mockPrisma.utilisationCalculation.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        calculatedUtilisation: 50.0,
        meetsTarget: false,
      }),
    });
    expect(result.calculatedUtilisation).toBe(50.0);
    expect(result.meetsTarget).toBe(false);
  });

  it("should handle decimal precision in calculation", async () => {
    const precisionInput = {
      ...mockInput,
      totalHours: 37.5,
      billableHours: 25,
    };
    const precisionCalculation = {
      ...mockCalculation,
      totalHours: 37.5,
      billableHours: 25,
      calculatedUtilisation: 66.67,
      meetsTarget: false,
    };

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);
    mockPrisma.utilisationCalculation.create.mockResolvedValue(
      precisionCalculation,
    );

    const result = await calculateUtilisationRequest(
      precisionInput,
      "user_123",
    );

    expect(mockPrisma.utilisationCalculation.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        calculatedUtilisation: 66.67,
      }),
    });
  });

  it("should throw error for infinite calculation result", async () => {
    const mockRound = jest.spyOn(Math, "round").mockReturnValue(Infinity);
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    await expect(
      calculateUtilisationRequest(mockInput, "user_123"),
    ).rejects.toThrow("Calculated Utilisation is Not a Valid Number");

    mockRound.mockRestore();
  });

  it("should handle database creation errors", async () => {
    const dbError = new Error("Database connection failed");
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);
    mockPrisma.utilisationCalculation.create.mockRejectedValue(dbError);

    await expect(
      calculateUtilisationRequest(mockInput, "user_123"),
    ).rejects.toThrow("Database connection failed");
  });
});
