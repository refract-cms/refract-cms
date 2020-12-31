import { parse } from 'https://deno.land/std@0.81.0/encoding/yaml.ts';
import * as semver from 'https://deno.land/x/semver@v1.0.0/mod.ts';
import * as colors from 'https://deno.land/std/fmt/colors.ts';

const config = Deno.env.toObject();
console.log(config);
// const targetBranch = config['GITHUB_BASE_REF'].replace('refs/heads/', '');
// const sourceBranch = config['GITHUB_HEAD_REF'].replace('refs/heads/', '');

async function getFileContents({ file, branch }: { file: string; branch: string }) {
  console.log(`origin/${branch}:${file}`);
  Deno.run({
    cmd: ['git', 'fetch', `origin`, `${branch}`],
    stdout: 'piped',
    stderr: 'piped',
  });
  const cmd = Deno.run({
    cmd: ['git', 'show', `origin/${branch}:${file}`],
    stdout: 'piped',
    stderr: 'piped',
  });

  const output = await cmd.output(); // "piped" must be set
  const outStr = new TextDecoder().decode(output);
  console.log({ outStr });

  cmd.close();

  return outStr;
}

async function getLocalFileContents(file: string) {
  const decoder = new TextDecoder('utf-8');
  const data = await Deno.readFile('lerna.json');
  return decoder.decode(data);
}

interface LernaJson {
  version: string;
}

// const sourceGitVersionResponse = JSON.parse(await getLocalFileContents('lerna.json')) as LernaJson;
const sourceGitVersionResponse = JSON.parse(await getFileContents({ file: 'lerna.json', branch: 'HEAD' })) as LernaJson;
const targetGitVersionResponse = JSON.parse(
  await getFileContents({ file: 'lerna.json', branch: 'master' })
) as LernaJson;

const sourceVersion = sourceGitVersionResponse.version;
const targetVersion = targetGitVersionResponse.version;

console.log({ sourceVersion, targetVersion });

if (semver.gt(sourceVersion, targetVersion)) {
  console.log(colors.green(`Version updated to ${sourceVersion}`));
} else {
  console.log(colors.red(`Must update next-version in GitVersion.yml to a version higher than ${targetVersion}`));
  Deno.exit(1);
}
