import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { CreatedUserEvent } from '../impl/created-user.event';

@EventsHandler(CreatedUserEvent)
export class CreatedUserHandler implements IEventHandler<CreatedUserEvent> {
  handle(event: CreatedUserEvent) {
    console.log(clc.yellowBright('Async HeroFoundItemEvent...'));
  }
}
