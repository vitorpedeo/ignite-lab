import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateProductParams = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug exists.');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
