import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreatedUserEvent } from '../events/impl/created-user.event';
import { CreateUserCommand } from '../commands/impl/create-user.command';

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreatedUserEvent),
      delay(1000),
      map((event) => {
        console.log(clc.redBright('Inside [UsersSagas] Saga'));
        return new CreateUserCommand(
          event.createUserDto.email,
          event.createUserDto.firstName,
          event.createUserDto.lastName,
          event.createUserDto.password,
          event.createUserDto.username,
        );
      }),
    );
  };
}
