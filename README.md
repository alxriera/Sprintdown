# Sprintdown - Debt Paydown Tracker

A mobile-first Progressive Web App (PWA) for tracking debt paydown with automatic rank-based payment allocation.

## Features

- **Rank-Based Payment Allocation**: Payments automatically go to the lowest-ranked unpaid debt
- **Overflow Logic**: When a payment exceeds a debt's balance, the remainder automatically flows to the next ranked debt
- **Mobile-First PWA**: Installable on iPhone via "Add to Home Screen"
- **localStorage Persistence**: All data stored locally, no external databases
- **Payment History**: Track all payments with timestamps and allocation details
- **Visual Progress**: See total paid, remaining balance, and current target debt
- **Simple Settings**: Edit debt names, balances, and interest rates

## Tech Stack

- React 18
- TypeScript
- Vite
- PWA with service worker support
- localStorage for data persistence

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to Vercel
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite and configure the build settings
6. Click "Deploy"

### Build Configuration

Vercel should auto-detect these settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Usage

### Adding a Payment

1. Enter the payment amount in the payment input
2. Click "Apply Payment"
3. The payment automatically goes to the lowest-ranked unpaid debt
4. If the payment exceeds the debt balance, overflow goes to the next debt

### Managing Debts

1. Click the settings (⚙️) button in the header
2. Edit debt names, balances, and interest rates
3. Click "Save Changes"

### Resetting Data

1. Open Settings
2. Click "Reset All Data"
3. Confirm the action

## Default Debts

The app comes pre-configured with these debts:
- Rank 1: Lending Club ($3,500)
- Rank 2: Citi ($0)
- Rank 3: BOA ($0)
- Rank 4: Upgrade ($0)

You can customize these in Settings.

## Payment Logic

The app follows these rules:

1. **Ranking**: Debts are processed in order by rank (1, 2, 3, 4)
2. **Target Selection**: The lowest-rank unpaid debt with a balance > 0 is the current target
3. **Payment Application**: Payments apply fully to the current target first
4. **Overflow**: If payment > target balance, the remainder flows to the next ranked debt
5. **Marking Paid**: When a debt's balance reaches $0, it's marked as paid

### Example

Initial state:
- Rank 1: $3,500
- Rank 2: $2,000
- Rank 3: $1,500

Payment of $4,000:
- $3,500 → Rank 1 (fully paid)
- $500 → Rank 2 (partial)

Result:
- Rank 1: $0 ✓ PAID
- Rank 2: $1,500
- Rank 3: $1,500

## Testing

The payment logic has been verified with comprehensive tests covering:
- Exact payment matching debt balance
- Overflow to next debt
- Multiple debt overflow chains
- Partial payments
- Payments exceeding all debts
- Sequential payment workflows

Run tests:
```bash
npx tsx test/paymentLogic.test.ts
```

## PWA Features

- Installable on mobile devices
- Offline support with service worker
- Mobile-optimized viewport
- Standalone display mode
- Custom app icon

### Installing on iPhone

1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

## License

MIT

## Notes

- **No Authentication**: This is a single-user local app
- **No Database**: All data stored in browser localStorage
- **No Analytics**: No tracking or external services
- **Privacy First**: Your data never leaves your device
