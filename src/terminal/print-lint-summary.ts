import chalk from 'chalk';
import { ESLint } from 'eslint';
import { ERROR_COLOR, WARNING_COLOR } from './colors';

export function printLintSummary(results: ESLint.LintResult[]): void {
  let errorCount = 0;
  let failureCount = 0;
  let passCount = 0;
  let warningCount = 0;

  results.forEach(function (result) {
    const messages = result.messages;

    if (messages.length === 0) {
      passCount++;
    } else {
      failureCount++;
      warningCount += result.warningCount;
      errorCount += result.errorCount;
    }
  });

  const fileCount = passCount + failureCount;

  const summaryLineArray = [
    chalk.bold(`${fileCount} file(s) checked.`),
    chalk.bold(`${passCount} passed.`),
    chalk.bold(`${failureCount} failed.`),
  ];

  if (warningCount || errorCount) {
    summaryLineArray.push(
      chalk[WARNING_COLOR].bold(`${warningCount} file(s).`),
    );
    summaryLineArray.push(chalk[ERROR_COLOR].bold(`${errorCount} file(s)`));
  }

  console.log(summaryLineArray.join('  '));
}
