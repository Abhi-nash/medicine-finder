# Medicine Equivalence Finder

An India-focused NestJS API that finds alternative medicine brands with the exact same active ingredients and strengths.

## Stack

- NestJS and TypeScript
- Prisma ORM
- SQLite (`prisma/dev.db`)
- PostgreSQL-ready Prisma schema for a later Supabase or Neon migration

## Run locally

```bash
npm install
npx prisma migrate deploy
npm run start:dev
```

The API listens on `http://localhost:3000` by default.

## API

### Create a medicine

`POST /medicine`

```json
{
  "brandName": "Augmentin 625",
  "manufacturer": "GSK",
  "compositions": [
    { "ingredientName": "Amoxicillin", "strength": "500 mg" },
    { "ingredientName": "Clavulanic Acid", "strength": "125 mg" }
  ]
}
```

### Get a medicine

`GET /medicine/:id`

### Find exact equivalents

`GET /equivalents/:id`

The result contains the requested medicine and every other medicine with the same normalized composition.

### Browse nearby availability

`GET /medicine/:id/nearby?pincode=751001`

Returns all in-stock listings in that pincode for the requested medicine and every exact equivalent. Each listing includes the shop, stock quantity, price, and an `isEquivalent` flag.

`GET /shop?pincode=751001` lists shops in a pincode with their in-stock inventory. Omit `pincode` to browse every shop.

### Buy a medicine

`POST /buy`

```json
{
  "buyerId": 2,
  "shopMedicineId": 2,
  "quantity": 1
}
```

Buying completes immediately without a payment gateway. The API atomically verifies stock, decreases the shop inventory, and records a completed purchase. Purchase history is available at `GET /purchases/user/:buyerId`.

## Matching rule

The service creates `compositionKey` automatically. Ingredient names are lowercased and converted to underscores; strengths are lowercased with whitespace removed; ingredient parts are sorted.

```text
Paracetamol + 650 mg
paracetamol:650mg

Amoxicillin 500 mg + Clavulanic Acid 125 mg
amoxicillin:500mg|clavulanic_acid:125mg
```

Therefore, Dolo 650 and Crocin 650 match, as do Augmentin 625 and Moxikind-CV 625, even when ingredient order, casing, or spacing differs.

## Verification

```bash
npm test
npm run build
```
