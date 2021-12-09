import chalk from 'chalk';
import { ESLint } from 'eslint';
import ora from 'ora';
import { promptToInputDescription } from '../cli/prompt';
import { ESLintDecorator } from '../eslint-decorator';

export async function doDisablePerFileAction(
  eslint: ESLintDecorator,
  results: ESLint.LintResult[],
  selectedRuleIds: string[],
) {
  const description = await promptToInputDescription();
  const fixingSpinner = ora('Disabling...').start();
  await eslint.disablePerFile(results, selectedRuleIds, description);
  fixingSpinner.succeed(chalk.bold('Disabling was successful.'));
}
