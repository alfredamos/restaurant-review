import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(private repo: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const { name, type, addressId, reviewId } = createRestaurantDto;
    return await this.repo.restaurant.create({
      data: {
        name,
        type,
        addressId,
        reviewId,
      },
    });
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.repo.restaurant.findMany({
      include: {
        address: true,
        review: true
      }
    });
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.repo.restaurant.findUnique({
      where: { id },
      include: {
        address: true,
        review: true
      }
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id = ${id} is not found.`);
    }
    return restaurant;
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const { name, type, addressId, reviewId } = updateRestaurantDto;

    const restaurant = await this.repo.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id = ${id} is not found.`);
    }

    return await this.repo.restaurant.update({
      where: { id },
      data: {
        id: updateRestaurantDto.id,
        name,
        type,
        addressId,
        reviewId,
      },
    });
  }

  async remove(id: string): Promise<Restaurant> {
    const restaurant = await this.repo.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id = ${id} is not found.`);
    }
    return this.repo.restaurant.delete({
      where: { id },
    });
  }
}
