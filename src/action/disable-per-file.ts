import { Remote } from 'comlink';
import { ESLint } from 'eslint';
import { fixingSpinner } from '../cli/ora.js';
import { promptToInputDescription } from '../cli/prompt.js';
import { SerializableCore } from '../core-worker.js';
import { Undo } from '../core.js';

export async function doDisablePerFileAction(
  core: Remote<SerializableCore>,
  results: ESLint.LintResult[],
  selectedRuleIds: string[],
): Promise<Undo> {
  const description = await promptToInputDescription();
  const undo = await fixingSpinner(async () => core.disablePerFile(results, selectedRuleIds, description));
  return undo;
}
