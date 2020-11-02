import { Controller, Get, Header, Query, Response } from '@nestjs/common';
import QRCode from 'qrcode';

@Controller('api/qrcode')
export class QrcodeController {
  @Get('')
  @Header('Content-Type', 'image/png')
  // @Redirect()
  // @Header('Content-Disposition', 'attachment; filename=qrcode.png')
  async qrcode(@Query('qrcode') qrcode = '', @Response() response) {
    QRCode.toFileStream(response, qrcode, {});
    // const url = await QRCode.toDataURL(qrcode);
    // return { url };
  }
}
