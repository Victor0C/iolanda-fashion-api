import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogin {
  constructor(acess_token: string) {
    return {
      acess_token,
    };
  }

  @ApiProperty()
  acess_token: string;
}
