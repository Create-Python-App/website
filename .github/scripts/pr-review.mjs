import { appendFileSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const SMALL_PR_FILES = 10;
const SMALL_PR_LINES = 200;
const requiredSections = ['## Description', '## Type of Change', '## How Has This Been Tested?', '## Checklist'];
const checklistItems = [
  'My code follows the style guidelines of this project',
  'I have performed a self-review of the code',
  'I have commented my code, particularly in hard-to-understand areas',
  'I have made corresponding changes to the documentation',
  'My changes generate no new warnings',
  'Any dependent changes have been merged and published in downstream modules',
  'I have checked my code and corrected any misspellings',
];

function isAddedOrModified(file) {
  return ['added', 'modified', 'renamed', 'copied'].includes(file.status);
}

export function reviewPullRequest(pullRequest, files) {
  const failures = [];
  const warnings = [];
  const messages = [];
  const body = pullRequest.body ?? '';

  if (!body) {
    failures.push(
      'Missing Summary - Add a `## Description` section explaining the motivation, changes, related issue, and required dependencies.',
    );
  }
  if (!pullRequest.title) failures.push('Missing PR Title - Add a relevant pull request title.');

  for (const section of requiredSections) {
    if (!body.includes(section)) failures.push(`Missing section: ${section}`);
  }
  for (const item of checklistItems) {
    if (!body.includes(`- [x] ${item}`)) warnings.push(`Unchecked checklist item: ${item}`);
  }

  const additions = files.reduce((total, file) => total + (file.additions ?? 0), 0);
  const deletions = files.reduce((total, file) => total + (file.deletions ?? 0), 0);
  const changedLines = additions + deletions;

  if (additions < deletions) messages.push('Thanks for removing more lines than you add.');
  if (changedLines <= SMALL_PR_LINES && files.length <= SMALL_PR_FILES) {
    messages.push('Thanks for keeping this pull request small.');
  }
  if (changedLines > SMALL_PR_LINES) warnings.push(`This PR changes more than ${SMALL_PR_LINES} lines.`);
  if (files.length > SMALL_PR_FILES) warnings.push(`This PR changes more than ${SMALL_PR_FILES} files.`);

  if (files.some((file) => isAddedOrModified(file) && /test.*\.[jt]sx?$/.test(file.filename))) {
    messages.push('Thanks for updating tests! Only you can prevent production fires.');
  }
  if (files.some((file) => isAddedOrModified(file) && /(^|\/).*\.md$/.test(file.filename))) {
    messages.push('Thanks for updating documentation.');
  }
  if (files.some((file) => file.status === 'modified' && /(^|\/)package\.json$/.test(file.filename))) {
    warnings.push('package.json changed. Ensure applicable lock files are updated.');
  }

  return { failures, warnings, messages, additions, deletions, changedLines, changedFiles: files.length };
}

async function fetchChangedFiles(repository, pullNumber, token) {
  const files = [];
  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/pulls/${pullNumber}/files?per_page=100&page=${page}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} while listing pull request files.`);
    const pageFiles = await response.json();
    files.push(...pageFiles);
    if (pageFiles.length < 100) return files;
  }
}

function renderSummary(review) {
  const sections = [
    '# Pull request review',
    `Files: ${review.changedFiles} · Lines added: ${review.additions} · Lines removed: ${review.deletions}`,
  ];
  if (review.failures.length) sections.push('## Required fixes', ...review.failures.map((item) => `- ${item}`));
  if (review.warnings.length) sections.push('## Warnings', ...review.warnings.map((item) => `- ${item}`));
  if (review.messages.length) sections.push('## Notes', ...review.messages.map((item) => `- ${item}`));
  return `${sections.join('\n')}\n`;
}

async function main() {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const pullRequest = event.pull_request;
  if (!pullRequest?.number) throw new Error('This workflow requires a pull_request event.');

  const files = await fetchChangedFiles(process.env.GITHUB_REPOSITORY, pullRequest.number, process.env.GITHUB_TOKEN);
  const review = reviewPullRequest(pullRequest, files);
  const summary = renderSummary(review);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  process.stdout.write(summary);
  for (const failure of review.failures) process.stdout.write(`::error::${failure}\n`);
  for (const warning of review.warnings) process.stdout.write(`::warning::${warning}\n`);
  for (const message of review.messages) process.stdout.write(`::notice::${message}\n`);
  if (review.failures.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
