import { parse } from 'https://deno.land/std@0.81.0/encoding/yaml.ts';
import * as semver from 'https://deno.land/x/semver@v1.0.0/mod.ts';
import * as colors from 'https://deno.land/std/fmt/colors.ts';

const config = Deno.env.toObject();

const targetBranch = config['GITHUB_BASE_REF'].replace('refs/heads/', '');
const sourceBranch = config['GITHUB_HEAD_REF'].replace('refs/heads/', '');

async function getFileContents({ file, branch }: { file: string; branch: string }) {
  const cmd = Deno.run({
    cmd: ['git', 'show', `origin/${branch}:${file}`],
    stdout: 'piped',
    stderr: 'piped',
  });

  const output = await cmd.output(); // "piped" must be set
  const outStr = new TextDecoder().decode(output);

  cmd.close();

  return outStr;
}

interface GitVersionResponse {
  'next-version': string;
}

const sourceGitVersionResponse = parse(
  await getFileContents({ file: 'GitVersion.yml', branch: sourceBranch })
) as GitVersionResponse;
const targetGitVersionResponse = parse(
  await getFileContents({ file: 'GitVersion.yml', branch: targetBranch })
) as GitVersionResponse;

const sourceVersion = sourceGitVersionResponse['next-version'];
const targetVersion = targetGitVersionResponse['next-version'];

console.log({ sourceVersion, targetVersion });

if (semver.gt(sourceVersion, targetVersion)) {
  console.log(colors.green(`Version updated to ${sourceVersion}`));
} else {
  console.log(colors.red(`Must update next-version in GitVersion.yml to a version higher than ${targetVersion}`));
  Deno.exit(1);
}
