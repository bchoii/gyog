import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { uuid } from '../../../../../../../main/src/utils';
import { XsrfGuard } from '../../util/XsrfGuard';
import { BethesdaService } from './bethesda.service';

@Controller('bethesda')
export class BethesdaController {
  constructor(private readonly service: BethesdaService) {}

  @Post('sms')
  @UseGuards(XsrfGuard)
  async sms(@Body() body) {
    await this.service.sms(body.itemid, body.action);
    return { bethesda: uuid() };
  }

  @Get('appointment')
  @UseGuards(XsrfGuard)
  async appointment(@Body() body) {
    return await this.service.appointment();
  }

  // @Get('request')
  // @Render('bethesda/request')
  // @UsePipes(SanitisePipe)
  // async request(@Query('ref') ref) {
  //   // if (ref) {
  //   //   await sendEmail(
  //   //     'bernard@kidotech.com',
  //   //     `Bethesda Request for Prescription ${ref}`,
  //   //     ref,
  //   //   );
  //   // }
  //   return { ref };
  // }

  // @Get('unsub')
  // @Render('bethesda/unsub')
  // @UsePipes(SanitisePipe)
  // async unsub(@Query('ref') ref) {
  //   console.log('bethesda/unsub', { ref });
  //   return { ref };
  // }
}
