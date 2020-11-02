import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { mkdirsSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import { uuid } from '../../../../../../../../main/src/utils';

@Controller('api/upload')
export class UploadController {
  @Post('')
  @UseInterceptors(AnyFilesInterceptor())
  uploadfile(@UploadedFiles() files) {
    console.log('upload');
    console.log(files);

    const code = uuid();
    console.log(code);
    const repository = join(
      __dirname,
      '../../../../../static/repository',
      code,
    );
    console.log(repository);
    mkdirsSync(join(repository));
    for (const file of files) {
      console.log(file);
      writeFileSync(join(repository, file.originalname), file.buffer);
    }

    const result = files.map(f => ({
      url: `/repository/${code}/${f.originalname}`,
    }));
    console.log(result);
    return result;
  }
}
