#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { CachedESLint } from './eslint/cached-eslint';
import { prompt } from './terminal/prompt';

const argv = yargs(process.argv.slice(2)).argv;
// NOTE: convert `string` type because yargs convert `'10'` (`string` type) into `10` (`number` type)
// and `lintFiles` only accepts `string[]`.
const patterns = argv._.map((pattern) => pattern.toString());

(async function main() {
  const eslint = new CachedESLint(patterns);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const statistics = await eslint.lint();

    if (statistics.ruleStatistics.length === 0) break;

    eslint.printStatistics(statistics);

    const ruleIdsInStatistics = statistics.ruleStatistics.map(
      (ruleStatistic) => ruleStatistic.ruleId,
    );

    const answers = await prompt(ruleIdsInStatistics);

    if (answers.action === 'showMessages') {
      await eslint.printErrorAndWarningMessages(
        statistics.results,
        answers.ruleIds,
      );
    } else if (answers.action === 'fix') {
      await eslint.fix(answers.ruleIds);
    }
    console.log('-'.repeat(process.stdout.columns));
  }
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
