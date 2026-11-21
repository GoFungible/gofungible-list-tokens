# Project Constraints: React & Web3 Architecture

## 1. Core Design Philosophy
This repo contains web dApp to manage my holdings of existed tokens in difefrent networks

## 2. System Requirements
*   **Runtime Dependency:** React `>=18.0.0` (Vite-powered SPA).
*   **Styling Engine:** Tailwind CSS `>=3.0.0`
*   **Icon Asset Library:** Lucide React `>=0.300.0`
*   **Type Engine:** Strict TypeScript compilation with exhaustive property typing.
*   **Blockchain:** Wagmi, Viem, ReactQuery
*   **Wallets:** RainbowKit

## 3. Architecture

## 4. Data
* The application must have a folder containing json files.
* Every json file in the folder represents a token (e.g. USDt or SOL) and contains all the chains and addresses where this token is deployed

## 5. UI
* The UI must allow selecting a token and will show a card layout for the selected token
* The cardlayout will contains cards. One cards per network where the token is deployed

## 8. Hard Human Confirmation Boundaries (HITL)
* **Think Before Acting:** You MUST print a short markdown list detailing your planned steps using the text response channel before executing any file edits or bash scripts.
* You must STOP code generation, freeze all operations, and ask the user for confirmation in chat before:
1. Installing ANY external NPM packages or components outside the core stack.
2. Altering RPC URLs or switching network configurations (e.g., Mainnet vs Testnets).
3. Modifying local smart contract ABI JSON files.
4. Writing state-changing blockchain calls (`.send()`, `writeContract`) without a UI loading state attached.

## 9. Security & Safety Rules
* **Write Protection:** Do not attempt to update this `AGENTS.md` file autonomously. 
* Do NOT hardcode, read, or generate private keys or seed phrases.
* You are write-blocked from accessing `.env` or `.env.local`. Ask the user in chat if variables are needed.
* Do NOT modify any file outside the webApp folder where this file is located
* Do NOT do git updates, human has to verify always before
* DO NOT install external npm packages unless explicitly instructed.
* All shell tools must target bash/zsh formatting.
* ALWAYS run `npm run test` before declaring a coding task finished.
