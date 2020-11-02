import { default as rawBody } from 'raw-body';

export const textParser = async (req, res, next) => {
  const contenttype = req.headers['content-type'];
  if (!contenttype || contenttype.startsWith('text')) {
    req.body = (await rawBody(req)).toString('utf8').trim();
  }
  next();
};

// app.use(async (req, res, next) => {
//   console.log('CUSTOM PARSER');
//   const contenttype = req.headers['content-type'];
//   console.log({ contenttype });
//   if (contenttype == undefined || contenttype == 'text/plain') {
//     if (req.readable) {
//       console.log({ bodybefore: req.body });
//       req.body = (await rawBody(req)).toString('utf8').trim();
//       console.log({ bodyafter: req.body });
//     }
//   }
//   console.log('CUSTOM PARSER next()');
//   next();
// });
