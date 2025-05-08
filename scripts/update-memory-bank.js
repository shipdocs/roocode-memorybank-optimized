#!/usr/bin/env node

/**
 * UMB (Update Memory Bank) Implementation
 *
 * This script implements the UMB functionality to update the memory bank files.
 * It gathers information about the project and updates the memory bank files accordingly
 * by using the MemoryBank class from the src/ library.
 */

const { execSync } = require('child_process');
// Assuming the compiled output is in 'dist' at the project root
const { MemoryBank } = require('../dist/index');

/**
 * Retrieves commit hashes and messages from the last 7 days, excluding merge commits.
 *
 * @returns {string[]} An array of recent commit descriptions, or an empty array if unavailable.
 */
function gatherRecentCommits() {
  try {
    // Get recent commits (last 7 days)
    const recentCommits = execSync('git log --since="7 days ago" --pretty=format:"%h - %s" --no-merges').toString();
    return recentCommits.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    // console.warn('Warning: Error gathering recent commits (git likely not initialized or no commits):', error.message);
    return [];
  }
}

/**
 * Retrieves a list of recent merged pull requests from the last 7 days using git merge commits.
 *
 * @returns {string[]} An array of strings representing recent merged pull requests, or an empty array if none are found or on error.
 */
function gatherRecentPRs() {
  try {
    // This is a simplified version - in a real implementation, you would use the GitHub API
    // For now, we'll use git log to get merge commits which likely represent merged PRs
    const recentPRs = execSync('git log --since="7 days ago" --merges --pretty=format:"%h - %s"').toString();
    return recentPRs.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    // console.warn('Warning: Error gathering recent PRs (git likely not initialized or no merge commits):', error.message);
    return [];
  }
}

/**
 * Gathers recent project activity and updates the memory bank using the MemoryBank class.
 *
 * Collects recent commits and pull requests from the local git repository, prepares structured update content for product context, active context, system patterns, decisions, and progress, and delegates the update process to the MemoryBank's command handler.
 *
 * @returns {Promise<{success: boolean, message: string}>} The result of the memory bank update operation.
 */
async function autoUpdateMemoryBank() {
  // Instantiate MemoryBank. By default, it will target './memory-bank' in the current working directory.
  const mb = new MemoryBank();
  // The initialize method now ensures the directory and master files are created if they don't exist.
  // It uses the default content defined within the MemoryBank class.
  await mb.initialize(); 
  console.log(`Memory bank will be managed at: ${mb.baseDir}`);

  try {
    // Gather information from recent commits and PRs
    const recentCommits = gatherRecentCommits();
    const recentPRs = gatherRecentPRs();

    // Extract information from commits and PRs
    const recentChangesContent = recentPRs.length > 0
      ? `Recent PRs:\n${recentPRs.map(pr => `- ${pr}`).join('\n')}`
      : (recentCommits.length > 0 ? `Recent Commits:\n${recentCommits.map(c => `- ${c}`).join('\n')}` : 'No recent PRs or commits found.');

    // Current focus based on recent activity - placeholder
    const currentFocusContent = "Maintaining and improving the memory bank system for better context retention across development sessions.";

    // Core features based on project structure - placeholder
    const coreFeaturesContent = `- Daily context tracking
- Session management
- Statistics tracking
- Roo-Code integration
- Automated documentation updates`;

    // Architecture overview based on project structure - placeholder
    const architectureOverviewContent = `- Enhanced Memory Bank: Core functionality for context retention
- Memory Bank: Simplified interface to the enhanced system
- Roo Integration: Connects memory bank with Roo-Code
- UMB Command: CLI tool for updating memory bank files`;

    // System patterns based on project structure - placeholder
    const architecturalPatternsContent = `- File-based storage for memory bank data
- Command-line interface for updates
- Markdown format for human-readable documentation
- Automated updates based on git history`;

    // Recent decisions based on commits - placeholder
    const decisionContent = {
      title: "Refactor UMB script to use MemoryBank library",
      rationale: "Centralize memory bank logic and improve maintainability.",
      implications: "UMB script now relies on the compiled MemoryBank class from dist/.",
      status: "Implemented"
    };

    // Progress updates based on recent activity - placeholder
    const progressContent = {
      currentTasks: [
        "Verify UMB command behavior with refactored script",
        "Ensure documentation for MemoryBank class is up-to-date"
      ],
      completedTasks: [
        "Refactored MemoryBank constructor for flexible pathing",
        "Added SystemPatterns, Decision, Progress update methods to MemoryBank class",
        "Refactored update-memory-bank.js to use MemoryBank class"
      ],
      upcomingTasks: [
        "Further testing of UMB command scenarios",
        "Consider adding more automated info gathering to UMB script"
      ],
      milestones: [
        {
          title: "Memory Bank Library Refactoring",
          description: "Successfully refactored UMB script to use the MemoryBank library, centralizing logic."
        }
      ]
    };

    // Create the updates object for handleUMBCommand
    const updates = {
      productContext: {
        coreFeatures: coreFeaturesContent,
        architectureOverview: architectureOverviewContent
      },
      activeContext: {
        currentFocus: currentFocusContent,
        recentChanges: recentChangesContent
      },
      systemPatterns: {
        architecturalPatterns: architecturalPatternsContent
      },
      decision: decisionContent,
      progress: progressContent
    };

    // Call the centralized command handler in MemoryBank
    const result = await mb.handleUMBCommand(updates);
    return result;

  } catch (error) {
    console.error('Error automatically updating memory bank:', error);
    return {
      success: false,
      message: `Failed to update memory bank: ${error.message}`
    };
  }
}

/**
 * Executes the memory bank auto-update process and logs the outcome.
 *
 * Calls {@link autoUpdateMemoryBank}, outputs the resulting message, and sets the process exit code to 1 if the update fails.
 */
async function main() {
  const result = await autoUpdateMemoryBank();
  console.log(result.message);
  if (!result.success) {
    process.exitCode = 1; // Indicate failure
  }
}

main();