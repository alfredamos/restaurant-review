import {IsNotEmpty, IsString} from "class-validator";
export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    addressId: string;
    @IsString()
    @IsNotEmpty()
    type: string;
    @IsString()
    @IsNotEmpty()
    reviewId: string
}
