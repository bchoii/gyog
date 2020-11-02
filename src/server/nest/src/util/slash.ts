import { extname } from 'path';
import { stringify } from 'querystring';

export const slash = (request, response, next) => {
  // console.log("Slash", req.method);
  if (extname(request.path)) {
    return next();
  }

  if (request.path.endsWith('/')) {
    return next();
  }

  // add slash
  return response.redirect(
    307, // 307 to retain POST
    [request.path + '/', stringify(request.query)].filter(x => x).join('?'),
  );
};
