import { Test, TestingModule } from '@nestjs/testing';
import { ShopMedicineService } from './shop-medicine.service';

describe('ShopMedicineService', () => {
  let service: ShopMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopMedicineService],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<ShopMedicineService>(ShopMedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
