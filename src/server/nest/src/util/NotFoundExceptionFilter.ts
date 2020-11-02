import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { statSync } from 'fs-extra';
import { extname, join } from 'path';
import { backtickrenderer } from './BacktickRenderer';

const staticroot = '../../../static';

const unique = (value, index, array) => array.indexOf(value) === index;

const exists = (path: string) => {
  try {
    const file = join(__dirname, staticroot, path);
    const result = statSync(file).isFile();
    return result;
  } catch (error) {}
};

const log = (...params) => {
  console.log('LOG', ...params);
  return params[0];
};

const walkpaths = path => {
  const segments = path.split('/');

  const results = segments
    .map((_, index) => segments.slice(0, index + 1).join('/'))
    .map(p => [p, p + '.html', p + '/index.html'])
    .flat()
    .map(p => p.replace(/\/+/g, '/')) // merge multiple slashes
    .filter(unique) // remove duplicates
    .filter(x => x) // remove empties
    .filter(x => !/\/\./.test(x)) // remove /.
    .filter(x => !/^\./.test(x)) // remove starting .
    .reverse();

  // console.log('walkpaths', results);
  return results;
};

const findpath = path =>
  walkpaths(path)
    .find(exists)
    .replace(/index\.html$/g, '');

const handle = (path, response) => {
  if (['.html'].includes(extname(path))) {
    const content = backtickrenderer(path, {});
    response.type(extname(path));
    return response.send(content);
  }
  return response.sendFile(path);
};

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const path = decodeURI(request.path)
      .replace(/\.{2,}/g, '') // strip multiple periods
      .replace(/\/+/g, '/'); // merge multiple slashes

    if (exists(path)) {
      return handle(join(__dirname, staticroot, path), response);
    }

    if (exists(join(path, 'index.html'))) {
      return handle(join(__dirname, staticroot, path, 'index.html'), response);
    }

    return handle(join(__dirname, staticroot, findpath(path)), response); // angular

    // return response.redirect(
    //   307, // 307 to retain POST
    //   [findpath(path), stringify(request.query as any)]
    //     .filter(x => x)
    //     .join('?'),
    // );
    // return response.redirect(findpath(path));
  }
}
