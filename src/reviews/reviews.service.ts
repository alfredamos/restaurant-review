import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private repo: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { reviewerName, rating, description } = createReviewDto;
    return await this.repo.review.create({
      data: {
        reviewerName,
        rating,
        description,
      },
    });
  }

  async findAll(): Promise<Review[]> {
    return await this.repo.review.findMany({
      include: {
        restaurants: true,
      }
    });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.repo.review.findUnique({
      where: { id },
      include: {
        restaurants: true,
      }
    });
    if (!review) {
      throw new NotFoundException(`Review with id = ${id} is not found.`);
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const { reviewerName, rating, description } = updateReviewDto;

    const review = await this.repo.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with id = ${id} is not found.`);
    }
    return await this.repo.review.update({
      where: { id },
      data: {
        reviewerName,
        rating,
        description,
      },
    });
  }

  async remove(id: string): Promise<Review> {
    const review = await this.repo.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with id = ${id} is not found.`);
    }
    return await this.repo.review.delete({
      where: { id },
    });
  }
}
