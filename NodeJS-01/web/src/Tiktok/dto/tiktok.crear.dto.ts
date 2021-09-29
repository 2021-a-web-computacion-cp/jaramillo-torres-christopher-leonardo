import {
    IsBoolean,
    IsDate,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

// @ts-ignore
export class TiktokCrearDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(15)
    autor: string;

    @IsNotEmpty()
    @IsDate()
    fechaPublicacion: Date

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    numReproudcciones: number;

    @IsNotEmpty()
    @IsBoolean()
    copyright: boolean

}