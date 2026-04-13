import * as serviceModule from "../src/api/v1/services/carServices";
import * as repositoryModule from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

const mockDate = new Date('2026-04-13T00:00:00.000Z');
global.Date = jest.fn(() => mockDate) as any;
global.Date.prototype.toISOString = jest.fn(() => '2026-04-13T00:00:00.000Z');

const mockedRepository = repositoryModule as jest.Mocked<typeof repositoryModule>;

describe("Car Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createCar", () => {
        it("should create car successfully", async () => {
            const mockInput = {
                model: "Toyota Camry",
                brand: "Toyota",
                year: 2020,
                price: "25000",
                color: "Red",
            };

            mockedRepository.getAllDocuments.mockResolvedValue([]);
            mockedRepository.createDocument.mockResolvedValue("Toyota Camry2020Red");

            const result = await serviceModule.createCar(mockInput);

            expect(mockedRepository.getAllDocuments).toHaveBeenCalledWith("Cars");
            expect(mockedRepository.createDocument).toHaveBeenCalledWith(
                "Cars",
                "Toyota Camry2020Red",
                expect.objectContaining({
                    carId: "Toyota Camry2020Red",
                    model: "Toyota camry",
                    brand: "Toyota",
                    year: 2020,
                    price: "$25,000.00",
                    color: "Red",
                    status: "available",
                    createdAt: '2026-04-13T00:00:00.000Z',
                    updatedAt: '2026-04-13T00:00:00.000Z',
                })
            );
            expect(result).toMatchObject({
                id: "Toyota Camry2020Red",
                carId: "Toyota Camry2020Red",
                model: "Toyota camry",
                brand: "Toyota",
                year: 2020,
                price: "$25,000.00",
                color: "Red",
                status: "available",
                createdAt: '2026-04-13T00:00:00.000Z',
                updatedAt: '2026-04-13T00:00:00.000Z',
            });
        });

        it("should throw an error when the car already exists", async () => {
            const mockInput = {
                model: "Toyota Camry",
                brand: "Toyota",
                year: 2020,
                price: "25000",
                color: "Red",
            };

            mockedRepository.getAllDocuments.mockResolvedValue([
                { carId: "Toyota Camry2020Red" } as any,
            ]);

            await expect(serviceModule.createCar(mockInput)).rejects.toThrow(
                "Failed to create car: car already exist in collection"
            );

            expect(mockedRepository.getAllDocuments).toHaveBeenCalledWith("Cars");
            expect(mockedRepository.createDocument).not.toHaveBeenCalled();
        });

        it("should throw an error when repository fails", async () => {
            const mockInput = {
                model: "Toyota Camry",
                brand: "Toyota",
                year: 2020,
                price: "25000",
                color: "Red",
            };

            mockedRepository.getAllDocuments.mockRejectedValue(new Error("DB error"));

            await expect(serviceModule.createCar(mockInput)).rejects.toThrow(
                "Failed to create car: DB error"
            );
        });
    });

    describe("getCarById", () => {
        it("should return car when found", async () => {
            const mockCar = {
                id: "Toyota Camry2020Red",
                carId: "Toyota Camry2020Red",
                model: "Toyota camry",
                brand: "Toyota",
                year: 2020,
                price: "$25,000.00",
                color: "Red",
                status: "available",
                createdAt: "2026-01-01T00:00:00.000Z",
                updatedAt: "2026-01-01T00:00:00.000Z",
            };

            mockedRepository.getDocById.mockResolvedValue(mockCar);

            const result = await serviceModule.getCarById("Toyota Camry2020Red");

            expect(mockedRepository.getDocById).toHaveBeenCalledWith(
                "Cars",
                "Toyota Camry2020Red"
            );
            expect(result).toEqual(mockCar);
        });

        it("should throw error when car not found", async () => {
            mockedRepository.getDocById.mockResolvedValue(null);

            await expect(
                serviceModule.getCarById("Toyota Camry2020Red")
            ).rejects.toThrow("Failed to retrieve the car: Car not found");
        });
    });

    describe("deleteCar", () => {
        it("should delete car successfully", async () => {
            mockedRepository.deleteDocument.mockResolvedValue(undefined);

            await serviceModule.deleteCar("Toyota Camry2020Red");

            expect(mockedRepository.deleteDocument).toHaveBeenCalledWith(
                "Cars",
                "Toyota Camry2020Red"
            );
        });
    });
});