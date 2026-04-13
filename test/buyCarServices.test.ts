import * as serviceModule from "../src/api/v1/services/buyCarServices";
import * as repositoryModule from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

const mockDate = new Date('2026-04-13T00:00:00.000Z');
global.Date = jest.fn(() => mockDate) as any;
global.Date.prototype.toISOString = jest.fn(() => '2026-04-13T00:00:00.000Z');

const mockedRepository = repositoryModule as jest.Mocked<typeof repositoryModule>;

describe("Buy Car Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createBuyCar", () => {
        it("should create buy car successfully", async () => {
            const mockInput = {
                customerName: "John Doe",
                customerEmail: "john@example.com",
                paymentMethod: "Credit Card",
                carId: "Toyota Camry2020Red",
                totalPrice: "25000.00",
            };

            const mockCar = {
                carId: "Toyota Camry2020Red",
                model: "Toyota Camry",
                brand: "Toyota",
                year: 2020,
                price: "$25,000.00",
                color: "Red",
                status: "available",
                createdAt: "2026-01-01T00:00:00.000Z",
                updatedAt: "2026-01-01T00:00:00.000Z",
            };

            mockedRepository.getAllDocuments.mockResolvedValue([mockCar]);
            mockedRepository.updateDocument.mockResolvedValue(undefined);
            mockedRepository.createDocument.mockResolvedValue("John DoeToyota Camry2020Red2026-04-13T00:00:00.000Z");

            const result = await serviceModule.createBuyCar(mockInput);

            expect(mockedRepository.getAllDocuments).toHaveBeenCalledWith("Cars");
            expect(mockedRepository.updateDocument).toHaveBeenCalledWith(
                "Cars",
                "Toyota Camry2020Red",
                expect.objectContaining({
                    ...mockCar,
                    status: "sold",
                    updatedAt: '2026-04-13T00:00:00.000Z',
                })
            );
            expect(mockedRepository.createDocument).toHaveBeenCalledWith(
                "Sales",
                "John DoeToyota Camry2020Red2026-04-13T00:00:00.000Z",
                expect.objectContaining({
                    customerName: "John Doe",
                    customerEmail: "john@example.com",
                    customerId: "John DoeToyota Camry2020Red2026-04-13T00:00:00.000Z",
                    paymentMethod: "Credit Card",
                    carId: "Toyota Camry2020Red",
                    purchaseDate: '2026-04-13T00:00:00.000Z',
                    totalPrice: "$25,000.00",
                })
            );
            expect(result).toMatchObject({
                id: "John DoeToyota Camry2020Red2026-04-13T00:00:00.000Z",
                customerName: "John Doe",
                customerEmail: "john@example.com",
                customerId: "John DoeToyota Camry2020Red2026-04-13T00:00:00.000Z",
                paymentMethod: "Credit Card",
                carId: "Toyota Camry2020Red",
                purchaseDate: '2026-04-13T00:00:00.000Z',
                totalPrice: "$25,000.00",
            });
        });

        it("should throw an error when the car is already sold", async () => {
            const mockInput = {
                customerName: "John Doe",
                customerEmail: "john@example.com",
                paymentMethod: "Credit Card",
                carId: "Toyota Camry2020Red",
                totalPrice: "25000.00",
            };

            const mockCar = {
                carId: "Toyota Camry2020Red",
                model: "Toyota Camry",
                brand: "Toyota",
                year: 2020,
                price: "$25,000.00",
                color: "Red",
                status: "sold",
                createdAt: "2026-01-01T00:00:00.000Z",
                updatedAt: "2026-01-01T00:00:00.000Z",
            };

            mockedRepository.getAllDocuments.mockResolvedValue([mockCar]);

            await expect(serviceModule.createBuyCar(mockInput)).rejects.toThrow(
                "Failed to create buy car: Car is already sold"
            );

            expect(mockedRepository.getAllDocuments).toHaveBeenCalledWith("Cars");
            expect(mockedRepository.updateDocument).not.toHaveBeenCalled();
            expect(mockedRepository.createDocument).not.toHaveBeenCalled();
        });

        it("should throw an error when the price does not match", async () => {
            const mockInput = {
                customerName: "John Doe",
                customerEmail: "john@example.com",
                paymentMethod: "Credit Card",
                carId: "Toyota Camry2020Red",
                totalPrice: "20000.00",
            };

            const mockCar = {
                carId: "Toyota Camry2020Red",
                model: "Toyota Camry",
                brand: "Toyota",
                year: 2020,
                price: "$25,000.00",
                color: "Red",
                status: "available",
                createdAt: "2026-01-01T00:00:00.000Z",
                updatedAt: "2026-01-01T00:00:00.000Z",
            };

            mockedRepository.getAllDocuments.mockResolvedValue([mockCar]);

            await expect(serviceModule.createBuyCar(mockInput)).rejects.toThrow(
                "Failed to create buy car: Price does not match the car's listed price"
            );

            expect(mockedRepository.getAllDocuments).toHaveBeenCalledWith("Cars");
            expect(mockedRepository.updateDocument).not.toHaveBeenCalled();
            expect(mockedRepository.createDocument).not.toHaveBeenCalled();
        });

        it("should throw an error when repository fails", async () => {
            const mockInput = {
                customerName: "John Doe",
                customerEmail: "john@example.com",
                paymentMethod: "Credit Card",
                carId: "Toyota Camry2020Red",
                totalPrice: "25000.00",
            };

            mockedRepository.getAllDocuments.mockRejectedValue(new Error("DB error"));

            await expect(serviceModule.createBuyCar(mockInput)).rejects.toThrow(
                "Failed to create buy car: DB error"
            );
        });
    });
});