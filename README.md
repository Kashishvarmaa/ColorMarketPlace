# Color Market Place

A decentralized application (DApp) for buying and selling digital colors on the Ethereum blockchain. Users can purchase unique colors, set credit limits, and manage their color portfolio, all powered by smart contracts and a modern web interface.

---

## Features

- **Decentralized Color Marketplace:** Buy and own unique digital colors on-chain.
- **Credit System:** Set and manage your own credit limit for purchases.
- **Ownership Tracking:** Each color is owned by a single address at a time.
- **Purchase Limits:** Each user can only buy a limited number of each color.
- **MetaMask Integration:** Connect and interact with the DApp using MetaMask.
- **Withdrawals:** Contract owner can withdraw accumulated funds.

---

## Tech Stack

- **Frontend:** Next.js, React
- **Smart Contracts:** Solidity (Hardhat framework)
- **Blockchain Interaction:** Ethers.js
- **Wallet:** MetaMask
- **Environment:** Node.js, npm

---

## Smart Contract Overview

**Contract:** `ColorMarket` (`contracts/Assessment.sol`)

- Manages a set of predefined colors (Red, Green, Blue, Yellow, Purple).
- Each color has a price and a purchase limit per user.
- Users can buy colors by sending ETH; ownership and credits are updated accordingly.
- Users can set their own credit limit.
- Owner can withdraw all accumulated funds.
- Emits events for purchases.

**Key Functions:**
- `buyColor(uint256 _colorIndex)`: Buy a color by index.
- `setCreditLimit(uint256 _limit)`: Set your credit limit.
- `listAvailableColors()`: View all available colors.
- `getColorsPurchased()`: View colors owned by the caller.
- `getTotalSpent()`: View total ETH spent by the caller.
- `withdraw()`: Owner withdraws contract funds.

---

## Frontend Overview

- Built with Next.js and React (`pages/index.js`).
- Connects to MetaMask for wallet authentication.
- Allows users to:
  - Set their credit limit
  - Buy colors by index
  - View their purchased colors (cart)
  - Withdraw funds (owner only)
- UI styled for clarity and ease of use.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [MetaMask](https://metamask.io/) browser extension

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ColorMarketPlace
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

#### Gitpod
This project includes a `.gitpod.yml` for one-click cloud development. Just open the repo in [Gitpod](https://gitpod.io/).

---

## Running the Project

### Local Development
Start the Next.js development server:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```

---

## Deploying the Smart Contract

1. **Configure your network and private key** in `hardhat.config.js`:
   - Add your Ethereum testnet RPC URL and private key.
2. **Compile the contract:**
   ```bash
   npx hardhat compile
   ```
3. **Deploy the contract:**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```
   The deployed contract address will be printed in the console.

---

## Environment Variables

- `.env` file can be used to store sensitive data (e.g., private keys, RPC URLs).
- Example:
  ```env
  PRIVATE_KEY=your_private_key_here
  SEPOLIA_RPC_URL=https://your-sepolia-rpc-url
  ```

---

## Project Structure

```
ColorMarketPlace/
├── contracts/           # Solidity smart contracts
│   └── Assessment.sol   # ColorMarket contract
├── pages/               # Next.js pages (frontend)
│   └── index.js         # Main DApp UI
├── scripts/             # Deployment scripts
│   └── deploy.js        # Hardhat deployment script
├── hardhat.config.js    # Hardhat configuration
├── package.json         # Project metadata and scripts
├── .gitpod.yml          # Gitpod cloud dev config
├── .gitignore           # Ignored files
└── README.md            # Project documentation
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
