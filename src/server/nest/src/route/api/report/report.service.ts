import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(private readonly em: EntityManager) {}

  async query(sql, params) {
    return await this.em.query(sql, params);
  }
}
