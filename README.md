## Folder

src/
├── app.module.ts # Application root module
├── config/ # Configuration files (e.g. TypeORM)
│ └── typeorm.config.ts
├── modules/
│ └── crypto-coins-tracking/ # Core bounded context
│ ├── domain/ # 🔷 Domain Layer (business logic)
│ │ ├── entities/ # Domain models (e.g. CryptoPrice)
│ │ ├── repositories/ # Port interfaces (e.g. Save to DB)
│ │ └── services/ # Port interfaces (e.g. fetch, notify)
│ │
│ ├── application/ # 🧠 Application Layer (use cases)
│ │ ├── use-cases/ # Application services (orchestrate domain logic)
│ │ └── formatters/ # Output format mappers
│ │
│ ├── infrastructure/ # ⚙️ Infrastructure Layer (adapters)
│ │ ├── database/ # TypeORM entities + repository implementations
│ │ └── providers/ # External services (e.g. CoinGecko API)
│ │
│ ├── interface/ # 🌐 Primary Adapters (entry points)
│ │ └── scheduler/ # Cron job that triggers daily tracking
│ │
│ ├── crypto-coins-tracking.module.ts # Module composition
│
├── prisma/ # (if Prisma used, optional)
└── main.ts # App bootstrap
