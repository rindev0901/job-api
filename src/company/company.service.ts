import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import type { Postgres } from '@/drizzle/db';
import { company } from '@/drizzle/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('DRIZZLE_CLIENT')
    private db: Postgres,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.db.insert(company).values(createCompanyDto).returning();
  }

  findAll() {
    return this.db.select().from(company);
  }

  findOne(id: string) {
    return this.db.query.company.findFirst({ where: eq(company.id, id) });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.db
      .update(company)
      .set(updateCompanyDto)
      .where(eq(company.id, id));
  }

  remove(id: string) {
    return this.db.delete(company).where(eq(company.id, id));
  }
}
