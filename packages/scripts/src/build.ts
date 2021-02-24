import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { spawn } from 'child_process';
import ora from 'ora';
import os from 'os';

const spinner = ora({
  text: 'Installing dependencies',
  spinner: 'dots',
});

export function build(args: {}) {
  console.log('building...');
}
