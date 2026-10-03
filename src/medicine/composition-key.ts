export interface CompositionInput {
  ingredientName: string;
  strength: string;
}

function normalizeIngredientName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeStrength(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '');
}

export function buildCompositionKey(compositions: CompositionInput[]): string {
  const parts = compositions.map(({ ingredientName, strength }) => {
    const ingredient = normalizeIngredientName(ingredientName);
    const normalizedStrength = normalizeStrength(strength);

    if (!ingredient || !normalizedStrength) {
      throw new Error('Each composition needs an ingredient name and strength.');
    }

    return `${ingredient}:${normalizedStrength}`;
  });

  return [...new Set(parts)].sort().join('|');
}
