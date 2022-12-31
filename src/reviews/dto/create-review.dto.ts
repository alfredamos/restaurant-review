import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    reviewerName: string;
    @IsNumber()
    @IsNotEmpty()
    rating: number;
    @IsString()
    @IsNotEmpty()
    description: string;
}
