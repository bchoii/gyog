// const fetch = require('node-fetch');
import { default as fetch } from 'node-fetch';

const main = async () => {
  const access_token =
    'EAANsgTZBfGSUBAKXuIwZB0EslHFNqLA33MSA92zYkT5M2RpCZCSZAMZAQldeHPio5b5fZBsxfxfapW5lsKHRtVwT6KYbixKzOiPKURPOR7rhQ3k10xCDleiVswNSemSzNyZBqZC5edjlk58LmW0Tq0NrW1sjhi7CjCRFKSLXsZCUSZAuVF7TWZB5crFsEPyg1yc9ERgO7bftuWWhwZDZD';
  const url = `https://graph.facebook.com/me?access_token=${access_token}`;
  try {
    const results = await (await fetch(url)).json();
    console.log('results', results);
  } catch (error) {
    console.error(error);
  }
};

if (require.main === module) {
  main();
}
