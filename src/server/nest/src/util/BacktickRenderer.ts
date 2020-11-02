import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const _render = (template, params) =>
  new Function(...Object.keys(params), `return \`${template}\`;`)(
    ...Object.values(params),
  );

export const wraptemplate = (templatedir, body) => {
  const layoutpath = join(templatedir, '_layout.html');
  if (existsSync(layoutpath)) {
    const layout = readFileSync(layoutpath);
    const output = _render(layout, { body });
    return wraptemplate(join(templatedir, '..'), output);
  }
  return body;
};

export const backtickrenderer = (path, params) => {
  const template = readFileSync(path);
  const rendered = _render(template, params);
  const output = wraptemplate(join(path, '..'), rendered);
  return output;
};
