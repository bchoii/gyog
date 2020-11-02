import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

export const sanitize = s =>
  s
    ?.replace(/[^\w\s\.]+/g, ' ') // replace consecutive non words/spaces/periods with space.
    .trim();
// .replace(/\s+/g, ' '); // merge consecutive spaces

@Injectable()
export class SanitationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Inside the SanitisePipe pipe...');
    console.log(value);
    console.log(metadata);
    console.log(typeof value);
    console.log(typeof value === 'string');
    return sanitize(value);
  }
}
