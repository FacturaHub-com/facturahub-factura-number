# facturahub-factura-number

**Parte del ecosistema [FacturaHub](https://facturahub.com?utm_source=github&utm_medium=referral&utm_campaign=factura-number)** — facturación en España, **Verifactu**, **IVA**, **Modelo 303** y automatización fiscal con IA.

> Numeración **correlativa** de facturas (España): formatear, parsear, siguiente número y **detectar huecos**. TypeScript · 0 dependencias · MIT.

## Instalación

```bash
npm i facturahub-factura-number
```

## Uso

```ts
import { formatNumber, nextNumber, findGaps, isCorrelative } from 'facturahub-factura-number';

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

## Ecosistema FacturaHub
- 🌐 [FacturaHub](https://facturahub.com?utm_source=github&utm_medium=referral&utm_campaign=factura-number) — la app (gratis, Verifactu incluido)
- 🔌 [facturahub-api](https://github.com/FacturaHub-com/facturahub-api) — API REST + OpenAPI 3.1
- 🤖 [facturahub-mcp](https://github.com/FacturaHub-com/facturahub-mcp) — servidor MCP (Claude, Cursor, ChatGPT)
- 🧾 [facturahub-verifactu](https://github.com/FacturaHub-com/facturahub-verifactu) — Verifactu por API
- 🧮 Librerías: nif-validator · iva · iban-es · factura-number · verifactu-qr · verifactu-hash · modelo-303
- ⚙️ Automatización: facturahub-n8n · n8n-nodes-facturahub · facturahub-woocommerce · facturahub-shopify

Temas: Verifactu · Facturación electrónica · IVA · Modelo 303 · AEAT · NIF/CIF · Autónomos · MCP · IA · España
