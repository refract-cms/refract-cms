import { parse } from 'https://deno.land/std@0.81.0/encoding/yaml.ts';
import * as semver from 'https://deno.land/x/semver@v1.0.0/mod.ts';
import * as colors from 'https://deno.land/std/fmt/colors.ts';

const config = Deno.env.toObject();

async function getFileContents({ file, branch }: { file: string; branch: string }) {
  console.log(`Reading ${branch}:${file}`);
  Deno.run({
    cmd: ['git', 'fetch', `origin`, `${branch}`],
    stdout: 'piped',
    stderr: 'piped',
  });
  const cmd = Deno.run({
    cmd: ['git', 'show', `${branch}:${file}`],
    stdout: 'piped',
    stderr: 'piped',
  });

  const output = await cmd.output(); // "piped" must be set
  const outStr = new TextDecoder().decode(output);

  cmd.close();

  return outStr;
}

// interface LernaJson {
//   version: string;
// }
interface GitVersionResponse {
  'next-version': string;
}

let failed = false;

async function compareVersion() {
  const file = 'GitVersion.yml';
  const sourceGitVersionResponse = parse(await getFileContents({ file, branch: 'HEAD' })) as GitVersionResponse;
  const targetGitVersionResponse =
    (parse(await getFileContents({ file, branch: 'origin/master' })) as GitVersionResponse) ||
    ({ 'next-version': '0.0.1' } as GitVersionResponse);

  const sourceVersion = sourceGitVersionResponse['next-version'];
  const targetVersion = targetGitVersionResponse['next-version'];

  console.log({ sourceVersion, targetVersion });

  if (semver.gt(sourceVersion, targetVersion)) {
    console.log(colors.green(`Version updated to ${sourceVersion}`));
  } else {
    console.log(
      colors.red(
        `Must update version in ${file} to a version higher than ${targetVersion} - Run "yarn bump-version" & commit to fix.`
      )
    );
    failed = true;
  }
}

await compareVersion();

if (failed) {
  Deno.exit(1);
}
