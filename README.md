# Optimized Roo Code Memory Bank Setup

A lean Roo Code config for VS Code, blending Claude Pro and OpenRouter to cut token costs (from €60/day to €20-30/day).

## Features
- **Daily Split**: Files like `activeContext-2025-03-02.md` (5k-15k tokens).
- **Fallback**: Auto-loads the latest day after a break.
- **Manual Updates**: `UMB` to update, no real-time waste.
- **Claude Pro + Haiku**: Pro for big tasks, Haiku for cheap updates.

## Files
- `.clinerules-architect`: System design mode.
- `.clinerules-code`: Coding mode.
- `.clinerules-ask`: Q&A mode.

## Setup
1. Clone this repo: `git clone https://github.com/your-username/roo-code-optimized.git`
2. Put files in your project root + make a `memory-bank/` folder.
3. Add OpenRouter/Claude Pro API keys in your `config.json`.
4. Type `UMB` to update daily files.

## Why?
Built to save tokens while keeping AI power. Ideal for PHP/webdev. Thanks to xAI’s Grok!

## License
MIT (feel free to tweak it!)
