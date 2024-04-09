import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('')
export class AppController {
  @ApiExcludeEndpoint()
  @Redirect('/docs')
  @Get()
  redirectToDocs() {}
}
