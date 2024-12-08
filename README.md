# Santa Adventure

Welcome to the [**Santa Adventure**](https://santaadventure.net) project! This is a web application built with Next.js, designed to provide an engaging user experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to [**Santa Adventure**](https://santaadventure.net), a magical gaming wonderland filled with Christmas spirit! We've carefully crafted a collection of interactive games featuring Santa Claus and holiday themes, from the heartwarming Mr. and Mrs. Santa adventure to engaging gift-matching challenges. Each game is infused with festive charm, making it perfect for families sharing precious moments or individuals seeking holiday entertainment. Whether you're helping Santa deliver presents or solving Christmas puzzles, Santa Adventure offers a unique gaming experience that captures the true essence of the holiday season. Join us on this delightful Christmas journey filled with surprises and joy!

## Features

- High-performance application built with Next.js
- TypeScript support
- Integrated with Tailwind CSS for styling
- Supports ESLint and Prettier for code quality checks
- PostgreSQL database (self-hosted) with pg client library for connections

## Installation

Please ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.js.org/) installed.

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/santa-adventure.git
   cd santa-adventure
   ```

2. Create PostgreSQL database, import category.sql, product_detail.sql, product_tag.sql under /db/pg/ directory

3. Install dependencies:
   ```bash
   pnpm install
   ```

## Usage

To start the development server, run:
```bash
pnpm dev
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

To build the production version, run:
```bash
pnpm build
```

To start the production server, run:
```bash
pnpm start
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

For any questions or support, please open an issue in this repository.