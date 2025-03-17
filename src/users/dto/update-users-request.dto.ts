import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDTO } from './create-users-request.dto';

export class UpdateUserRequestDTO extends PartialType(CreateUserRequestDTO) {}
