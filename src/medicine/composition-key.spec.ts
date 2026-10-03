import { buildCompositionKey } from './composition-key';

describe('buildCompositionKey', () => {
  it('normalizes a single ingredient', () => {
    expect(
      buildCompositionKey([
        { ingredientName: 'Paracetamol', strength: '650 mg' },
      ]),
    ).toBe('paracetamol:650mg');
  });

  it('sorts and normalizes multiple ingredients', () => {
    expect(
      buildCompositionKey([
        { ingredientName: 'Clavulanic Acid', strength: '125 MG' },
        { ingredientName: 'Amoxicillin', strength: '500 mg' },
      ]),
    ).toBe('amoxicillin:500mg|clavulanic_acid:125mg');
  });
});
