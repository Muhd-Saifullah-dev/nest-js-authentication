import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsStrongPassword({minLength:8,minUppercase:1,minNumbers:1,
    minSymbols:1,
  })
  password: string;
}
