import * as serviceModule from "../src/api/v1/services/salesServices";
import * as repositoryModule from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

const mockDate = new Date('2026-04-13T00:00:00.000Z');
global.Date = jest.fn(() => mockDate) as any;
global.Date.prototype.toISOString = jest.fn(() => '2026-04-13T00:00:00.000Z');

const mockedRepository = repositoryModule as jest.Mocked<typeof repositoryModule>;

describe("Sales Services", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllSales", () => {
        it("should retrieve all sales successfully", async () => {
            const mockSales = [
                {
                    customerName: "John Doe",
                    customerEmail: "john.doe@example.com",
                    paymentMethod: "Credit Card",
                    carId: "Toyota Camry2020Red",
                    totalPrice: 25000,
                    purchaseDate: "2026-04-13T00:00:00.000Z",
                    customerId: "customer123"
                }
            ];

            mockedRepository.getAllDocuments.mockResolvedValue(mockSales);

            const result = await serviceModule.getAllSales();

            expect(result).toEqual(mockSales);
        });

    });
});