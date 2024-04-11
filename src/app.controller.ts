import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { tags } from './swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get app info, version, environment, etc',
    description:
      'This is generally used as a health check endpoint, so insert what you are expect to be healthy',
    tags: [tags.example.name],
  })
  @Get()
  getAppInfo() {
    return {
      name: 'refinancy',
      environment: this.appService.getHello(),
    };
  }
}
