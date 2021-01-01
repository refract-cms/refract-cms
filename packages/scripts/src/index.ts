import program, { CommandOptions } from 'commander';
import shell from 'shelljs';
import { startDevServer } from 'snowpack';
import path from 'path';

export async function run(args) {
  program.command('dev [cmd]').action((cmd, {}) => {
    console.log('hi');
    const s = startDevServer as typeof startDevServer & any;
    s({
      config: {
        knownEntrypoints: [path.resolve(process.cwd(), 'src/client.tsx')],
        alias: {},
        devOptions: {
          port: 8000,
          hmr: true,
          output: 'stream',
          fallback: '',
        },
        buildOptions: {
          out: 'dev',
          watch: true,
          baseUrl: '',
          clean: true,
        },
      },
    });
  });

  program.parse(args);
}
