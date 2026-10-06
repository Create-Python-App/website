import assert from 'node:assert/strict';
import test from 'node:test';
import { reviewPullRequest } from './pr-review.mjs';

const checklist = [
  'My code follows the style guidelines of this project',
  'I have performed a self-review of the code',
  'I have commented my code, particularly in hard-to-understand areas',
  'I have made corresponding changes to the documentation',
  'My changes generate no new warnings',
  'Any dependent changes have been merged and published in downstream modules',
  'I have checked my code and corrected any misspellings',
];
const validPullRequest = {
  title: 'docs: clarify installation',
  body: [
    '## Description',
    'Clarify setup instructions.',
    '## Type of Change',
    'Documentation',
    '## How Has This Been Tested?',
    'Reviewed the generated page.',
    '## Checklist',
    ...checklist.map((item) => `- [x] ${item}`),
  ].join('\n'),
};

test('accepts a complete small pull request', () => {
  const result = reviewPullRequest(validPullRequest, [
    { filename: 'src/app.test.tsx', status: 'modified', additions: 2, deletions: 1 },
    { filename: 'docs/guide.md', status: 'modified', additions: 5, deletions: 0 },
  ]);

  assert.deepEqual(result.failures, []);
  assert.deepEqual(result.warnings, []);
  assert.ok(result.messages.includes('Thanks for updating tests! Only you can prevent production fires.'));
  assert.ok(result.messages.includes('Thanks for updating documentation.'));
});

test('fails missing title, description, and required sections and warns on unchecked items', () => {
  const result = reviewPullRequest({ title: '', body: '' }, []);

  assert.equal(result.failures.length, 6);
  assert.equal(result.warnings.length, checklist.length);
});

test('warns when the diff exceeds either threshold', () => {
  const files = Array.from({ length: 11 }, (_, index) => ({
    filename: `src/file-${index}.tsx`,
    status: 'modified',
    additions: 20,
    deletions: 0,
  }));
  const result = reviewPullRequest(validPullRequest, files);

  assert.ok(result.warnings.includes('This PR changes more than 200 lines.'));
  assert.ok(result.warnings.includes('This PR changes more than 10 files.'));
});

test('warns when a package manifest changes', () => {
  const result = reviewPullRequest(validPullRequest, [
    { filename: 'package.json', status: 'modified', additions: 1, deletions: 1 },
  ]);

  assert.ok(result.warnings.includes('package.json changed. Ensure applicable lockfiles are updated.'));
});
