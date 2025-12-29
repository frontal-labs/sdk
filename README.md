# Frontal SDK

The primary programmatic interface to the Frontal platform. Clean, typed, composable, and extensible.

## Features

- **Strongly Typed**: Built with TypeScript for excellent DX.
- **Composable**: Small, focused primitives.
- **Runtime Agnostic**: Powered by Bun, but compatible with modern ESM environments.
- **Zero Dependencies**: Lightweight and fast.

## Installation

```bash
bun add @frontal/sdk
# or
npm install @frontal/sdk
```

## Basic Usage

```typescript
import { Frontal } from "@frontal/sdk";

const client = new Frontal({
  bearerToken: process.env.FRONTAL_API_KEY,
  environment: "prod",
});

// Access resources
const teams = await client.teams.list();
console.log(teams.data);
```

## Authentication

The SDK supports two primary authentication methods:

### Bearer Token
Best for personal access tokens or OAuth flows.
```typescript
const client = new Frontal({ bearerToken: "YOUR_TOKEN" });
```

### API Key
Best for service-to-service communication.
```typescript
const client = new Frontal({ apiKey: "YOUR_API_KEY" });
```

## Environment Configuration

You can specify the environment in the constructor or via environment variables:

```typescript
const client = new Frontal({ environment: "staging" });
```

**Environment Variables:**
- `FRONTAL_TOKEN`: Default bearer token.
- `FRONTAL_ENV`: Default environment (`prod`, `staging`, `dev`).

## Error Handling

All SDK errors inherit from `FrontalError`.

```typescript
try {
  await client.teams.get("non-existent");
} catch (error) {
  if (error instanceof NotFoundError) {
    // Handle 404
  } else if (error instanceof AuthenticationError) {
    // Handle 401/403
  }
}
```

## Architecture

- **Transport**: Centralized HTTP abstraction.
- **Auth**: Pluggable strategies for different auth methods.
- **Resources**: Namespaced domain logic (e.g., `client.teams`).
- **Configuration**: Flexible resolution from options or environment.
