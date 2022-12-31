import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressesService {
  constructor(private repo: PrismaService) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { street, city, postCode, state } = createAddressDto;

    return await this.repo.address.create({
      data: {
        street,
        city,
        postCode,
        state,
      },
    });
  }

  async findAll(): Promise<Address[]> {
    return await this.repo.address.findMany({
      include: {
        restaurant: true,
      }
    });
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.repo.address.findUnique({
      where: { id },
      include: {
        restaurant: true,
      }
    });
    if (!address) {
      throw new NotFoundException(`Address with id = ${id} is not found.`);
    }
    return address;
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const { street, city, postCode, state } = updateAddressDto;
    const address = await this.repo.address.findUnique({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`Address with id = ${id} is not found.`);
    }

    return this.repo.address.update({
      where: { id },
      data: {
        street,
        city,
        postCode,
        state,
      },
    });
  }

  async remove(id: string): Promise<Address> {
    const address = await this.repo.address.findUnique({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`Address with id = ${id} is not found.`);
    }
    return this.repo.address.delete({
      where: { id },
    });
  }
}
