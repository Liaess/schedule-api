import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from '@users/dto/create-users.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
