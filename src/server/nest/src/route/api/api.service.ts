import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { uuid } from '../../../../../../../main/src/utils';

@Injectable()
export class ApiService {
  constructor(private readonly em: EntityManager) {}

  next(code) {
    return `${code}-${uuid()}`;
  }
}
