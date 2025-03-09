# Optimized Roo Code Memory Bank Setup

A lean Roo Code config for VS Code, blending Claude Pro and OpenRouter to cut token costs (from €60/day to €20-30/day).

## Features
- **Daily Split**: Files like `activeContext-2025-03-09.md` with token limits (5k-15k tokens)
- **Fallback**: Auto-loads the latest day after a break or session timeout
- **Manual Updates**: `UMB` to update, no real-time waste
- **Token Tracking**: Tracks usage and costs in `token-costs.md`
- **Claude Pro + Haiku**: Pro for big tasks, Haiku for cheap updates

## Files
- `.clinerules-architect`: System design mode
- `.clinerules-code`: Coding mode
- `.clinerules-ask`: Q&A mode
- `.clinerules-debug`: Troubleshooting mode
- `.clinerules-test`: Test creation/execution mode

## Setup
1. Clone this repo
2. Copy rule files to your project root
3. Create a `memory-bank/` folder in your project
4. Leave VS Code's "Custom Instructions" boxes empty
5. Switch to Architect/Code mode and type "hello" to initialize

## Why?
Built to save tokens while keeping AI power. Includes token cost tracking and flexible per-mode permissions. Perfect for PHP/webdev projects.

## License
Apache 2.0 © 2025
