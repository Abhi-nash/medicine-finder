import { Test, TestingModule } from '@nestjs/testing';
import { ShopMedicineController } from './shop-medicine.controller';

describe('ShopMedicineController', () => {
  let controller: ShopMedicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopMedicineController],
    })
      .useMocker(() => ({}))
      .compile();

    controller = module.get<ShopMedicineController>(ShopMedicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
