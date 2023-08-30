/* eslint-disable prettier/prettier */
import { PropertyType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class HomeResponseDto {
  id: string;
  address: string;

  @Exclude()
  number_of_bedrooms: number;
  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.numberOfBedrooms;
  }

  @Exclude()
  number_od_bathrooms: number;

  @Expose({ name: 'numberOfBathrooms' })
  numberOfBathroomd() {
    return this.numberOfBathroomd;
  }

  city: string;

  @Exclude()
  listed_time: Date;
  @Expose({ name: 'listedTime' })
  listedTime() {
    return this.listedTime;
  }
  price: number;

  @Exclude()
  land_size: number;
  @Expose({ name: 'landSize' })
  landSize() {
    return this.landSize;
  }

  property_type: PropertyType;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  // eslint-disable-next-line prettier/prettier
  @Exclude()
  // eslint-disable-next-line prettier/prettier
  realtor_id: string;

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}
