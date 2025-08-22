import { describe, it, expect, beforeEach, vi } from "vitest";
import { SkuService } from "../application/services/SkuService.js";
import { Sku } from "../domain/entities/Sku.js";
import { SkuStates } from "../domain/types/StatesEnum.js";
import { APIError } from "../application/errors/ApiError.js";

describe("SkuService", () => {
  const mockRepo = {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    findBySku: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a SkuService instance", () => {
    const service = new SkuService(mockRepo);
    expect(service).toBeInstanceOf(SkuService);
  });

  it("should call repository create on create", async () => {
    const service = new SkuService(mockRepo);
    const dto = {
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku1",
    };
    await service.create(dto);
    expect(mockRepo.create).toHaveBeenCalled();
    const skuArg = mockRepo.create.mock.calls[0][0];
    expect(skuArg).toBeInstanceOf(Sku);
    expect(skuArg.description).toBe("desc");
  });

  it("should call repository update on update with description", async () => {
    const service = new SkuService(mockRepo);
    const sku = new Sku({
      id: "1",
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku1",
    });
    mockRepo.findById.mockResolvedValue(sku);
    await service.update({ id: "1", description: "newdesc" });
    expect(mockRepo.findById).toHaveBeenCalledWith("1");
    expect(sku.description).toBe("newdesc");
  });

  it("should call repository update on update with comercialDescription", async () => {
    const service = new SkuService(mockRepo);
    const sku = new Sku({
      id: "2",
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku2",
    });
    mockRepo.findById.mockResolvedValue(sku);
    await service.update({ id: "2", comercialDescription: "newcomdesc" });
    expect(sku.comercialDescription).toBe("newcomdesc");
  });

  it("should call repository update on update with sku", async () => {
    const service = new SkuService(mockRepo);
    const sku = new Sku({
      id: "3",
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku3",
    });
    mockRepo.findById.mockResolvedValue(sku);
    await service.update({ id: "3", sku: "newsku" });
    expect(sku.sku).toBe("newsku");
  });

  it("should call repository findAll", async () => {
    const service = new SkuService(mockRepo);
    mockRepo.findAll.mockResolvedValue(["sku1", "sku2"]);
    const result = await service.findAll(1, 10);
    expect(mockRepo.findAll).toHaveBeenCalledWith({ limit: 10, page: 1 });
    expect(result).toEqual(["sku1", "sku2"]);
  });

  it("should change state of SKU with valid transitions", async () => {
    const service = new SkuService(mockRepo);
    const sku = new Sku({
      id: "4",
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku4",
    });
    mockRepo.findById.mockResolvedValue(sku);
    mockRepo.update.mockResolvedValue(sku);

    await service.changeState("4", SkuStates.CadastroCompleto);
    expect(sku.stateName).toBe(SkuStates.CadastroCompleto);

    await service.changeState("4", SkuStates.Ativo);
    expect(sku.stateName).toBe(SkuStates.Ativo);
  });

  it("should throw APIError if SKU not found on changeState", async () => {
    const service = new SkuService(mockRepo);
    mockRepo.findById.mockResolvedValue(undefined);
    await expect(
      service.changeState("notfound", SkuStates.Ativo),
    ).rejects.toThrow(APIError);
  });

  it("should throw APIError if SKU not found on update", async () => {
    const service = new SkuService(mockRepo);
    mockRepo.findById.mockResolvedValue(undefined);
    await expect(service.update({ id: "notfound" })).rejects.toThrow(APIError);
  });
});
