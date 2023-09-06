import { IsString, Length, IsBoolean, IsNotEmpty, IsInt, IsDateString } from 'class-validator';
import { IsCustomDateString } from '../validate/validateDate';


export class TravelDTO {
    @Length(1, 255)
    name: string;

    @Length(1, 255)
    destination: string;

    @IsCustomDateString({message: "date fuck error"})
    @IsNotEmpty()
    startDate: Date;

    @IsCustomDateString({message: "date fuck error"})
    @IsNotEmpty()
    endDate: Date;

    @IsBoolean()
    is_public: Boolean;

    @IsInt()
    number_of_days: number;

    constructor(
        name: string,
        destination: string,
        startDate: Date,
        endDate: Date,
        is_public: boolean,
        number_of_days: number
    ) {
        this.name = name;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.is_public = is_public;
        this.number_of_days = number_of_days;
    }

}
