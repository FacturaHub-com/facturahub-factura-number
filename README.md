# @facturahub/factura-number

> Numeración **correlativa** de facturas (España): formatear, parsear, siguiente número y **detectar huecos**. TypeScript · 0 dependencias · MIT.

## Instalación

```bash
npm i @facturahub/factura-number
```

## Uso

```ts
import { formatNumber, nextNumber, findGaps, isCorrelative } from '@facturahub/factura-number';

formatNumber({ series: 'FAC', year: 2026, seq: 42 }); // 'FAC/2026/0042'
nextNumber('2026/0099');                              // '2026/0100'

findGaps(['2026/0001', '2026/0002', '2026/0004']);    // [3]  ← falta la 0003
isCorrelative([1, 2, 3, 4]);                          // true
```

## API

| Función | Qué hace |
|---|---|
| `formatNumber(parts, opts?)` | Construye el número (serie/año/secuencial, pad, separador) |
| `parseNumber(value, sep?)` | Desglosa `'FAC/2026/0042'` → `{ series, year, seq }` |
| `nextNumber(last, opts?)` | Siguiente número manteniendo el formato |
| `findGaps(numbers, sep?)` | Secuenciales que faltan en la serie |
| `isCorrelative(numbers, sep?)` | `true` si no hay huecos |

## Por qué existe

La ley exige que las facturas lleven una numeración **correlativa y sin saltos**; un hueco es un problema en una inspección. Esta librería formatea/parsea el número y, sobre todo, **detecta huecos** en la serie, sin dependencias.

---

Hecho por [**FacturaHub**](https://facturahub.com?utm_source=npm&utm_medium=referral&utm_campaign=factura-number) — facturación con IA para autónomos en España: numeración correlativa automática, **Verifactu** y Modelo 303. Gratis.
