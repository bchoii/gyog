import { execSync } from 'child_process';
import { mkdirsSync, readFileSync, removeSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import { uuid } from '../../../../../../main/src/utils';

export const zip = (buffer, filename, password) => {
  const code = uuid();
  mkdirsSync(join(__dirname, code));
  writeFileSync(join(__dirname, code, filename), buffer);
  const command = `zip -P ${password} temp.zip '${filename}'`;
  console.log({ command });
  const zipProcess = execSync(command, {
    cwd: join(__dirname, code),
  }).toString();
  console.log({ zipProcess });
  const zippedbuffer = readFileSync(join(__dirname, code, 'temp.zip'));
  removeSync(join(__dirname, code));
  return zippedbuffer;
};

const main = async () => {
  const buffer = Buffer.from(new Date().toString());
  const zippedbuffer = zip(buffer, 'buffer.txt', 'password');
};

if (require.main === module) {
  main();
}
