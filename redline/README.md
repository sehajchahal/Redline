# Redline — Performance Garage

Static, responsive dark dashboard for performance cars, model years 2018–2024. Run `npm run dev` and open http://127.0.0.1:4173. No installation or build is required; deploy `dist/` to any static host. Node 20+ is needed for the developer scripts. Never open index.html directly with file://: JSON/module loading requires HTTP.

## Features

- Seven manufacturers, sports cars/SUVs/supercars/hypercars, dependent model/trim/year selectors, search.
- 716 real EPA configurations plus 20 manufacturer configurations for trims that the EPA catalogue groups more broadly.
- Manufacturer-referenced performance overlays with exact-year or clearly labeled generation scope. Unverified fields are intentionally blank.
- Comparison of up to three configurations; selection and comparison list saved locally on the device.
- Horsepower/torque and acceleration graphs, explicitly illustrative rather than measured dyno/telemetry.
- Depreciation and appreciation calculator accepting original price, known current value or an annual assumption.
- Direct public EPA REST API refresh per vehicle; offline-friendly dated JSON fallback.
- Optional authenticated MarketCheck price-snapshot ingestion (not connected by default).

## Data boundaries

This is not a complete worldwide registry. US EPA model years and carline names differ from global release dates and specific trims. Every EPA configuration retains its original ID and source URL. Manufacturer-only rows are labeled and do not inherit EPA fuel economy from a different car.

`dist/data/specs.json` contains source URLs, year ranges, exact model regexes, unit conversions, and scope notes. A generation reference is not an independent verification of every model year. Horsepower is mechanical hp; metric PS/CV is converted by 0.98632 where needed. Torque conversion: Nm × 0.73756. 0–100 km/h is never converted or mislabeled as 0–60 mph. Do not indiscriminately copy a top-trim's power into an EPA record that combines trims.

Dyno-style lines assume a torque ramp/plateau followed by a power cap and taper; `hp = torque × RPM / 5252` holds at every point. Curve shape and maximum RPM are hypothetical, not a vehicle's measured curve or real redline. Hybrid curves are excluded. Depreciation curves are calculations, not observed price history. There are no invented valuations or sale records.

## Public EPA refresh

The browser's **Refresh API** fetches the selected exact record. A failed or blocked request preserves the dated local snapshot. To persist an API refresh:

```sh
node scripts/refresh-epa.mjs 44461
```

For a full catalogue refresh, download the official dataset from https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip and run:

```sh
python3 scripts/build-catalog.py /absolute/path/vehicles.csv.zip
```

Review changes and publish the updated static files. The raw download isn't committed. Manufacturer-only configurations live in `supplemental.json` and are preserved by the EPA importer.

## Current market prices — requires provider access

No MarketCheck key was supplied, so live prices and actual price history are **not connected**. The site honestly reports this. Obtain an eligible provider plan and set `MARKETCHECK_API_KEY` in the script process environment. Never put keys into browser JS, JSON, the public directory, source-control, or command arguments. The script does not automatically load .env files.

The CLI requires an exact selected car ID and explicit provider model/trim mapping to avoid mixing ordinary, Competition, and special editions:

```sh
node scripts/refresh-market.mjs --id=EXACT_EPA_ID --model='EXACT_PROVIDER_MODEL' --trim='EXACT_PROVIDER_TRIM'
```

Optional `--body_type=`, `--drivetrain=` and `--transmission=` narrow the provider cohort. Confirm mappings against MarketCheck's taxonomy. Fewer than three priced listings or an invalid/error response leaves existing data untouched. Each published snapshot records its query, timestamp and sample count. Advertised asking prices are not appraisals or completed sales. This integration is implemented against the provider's documentation but could not be live-tested without credentials. Republishing is necessary to expose a changed snapshot; no server-side secret is needed at runtime.

## Validation

`npm test` covers unique IDs, year boundaries, V8/hybrid isolation, xDrive/CS isolation, manual/automatic timing, unit distinctions, depreciation edge cases, and dyno dimensional identity. `npm run check` checks JavaScript syntax. The local browser smoke test additionally exercises selectors, comparison, calculation, empty states, mobile overflow and live EPA access; it uses the Codex environment's Playwright and installed Chrome paths, which may need adjustment on another machine.

## Structure

- `dist/index.html`, `style.css`, `app.js`: self-contained static client.
- `dist/logic.js`: tested spec matching and calculations.
- `dist/data/catalog.json`: official EPA snapshot.
- `dist/data/specs.json`: curated manufacturer overlays.
- `dist/data/supplemental.json`: explicitly manufacturer-only variants.
- `dist/data/market.json`: optional authenticated provider snapshots (empty initially).
- `scripts/`: local serving, data refresh, and checks.

Source documentation: [EPA](https://www.fueleconomy.gov/feg/ws/index.shtml), [MarketCheck inventory](https://docs.marketcheck.com/docs/api/cars/inventory/inventory-search). Manufacturer citations appear alongside each supported vehicle.

## AMG GT coverage

Includes every AMG GT carline in the 2018–2024 EPA snapshot: base Coupe/Roadster, GT S Coupe, GT C Coupe/Roadster, GT R Coupe/Roadster, 2021 GT Black Series, four-door GT 43/53/63/63 S and 2024 two-door GT 55/63. The 2020 GT R PRO is a separate manufacturer-only configuration with no borrowed EPA economy. Appearance packages such as Stealth Edition are described in the underlying model notes, not invented as separate powertrains. Search accepts compact terms such as `amg gtr`.

Comparison is part of Explore cars: Add another car opens inline model/year/trim selectors. Up to three complete dashboards retain performance graphs, engine details, EPA refresh, market status, and user-entered depreciation scenarios. Mobile stacks the dashboards.
