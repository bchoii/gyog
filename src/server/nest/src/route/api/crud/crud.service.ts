import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Appointment } from '../../../../entities2/Appointment';
import { Category } from '../../../../entities2/Category';
import { Child } from '../../../../entities2/Child';
import { Config } from '../../../../entities2/Config';
import { Csat } from '../../../../entities2/Csat';
import { Parent } from '../../../../entities2/Parent';
import { Product } from '../../../../entities2/Product';
import { Queue } from '../../../../entities2/Queue';
import { User } from '../../../../entities2/User';

const modelmap = {
  // reminder: { type: Reminder, relations: [] },
  // patient: { type: Patient, relations: ['treatment'] },
  // treatment: { type: Treatment, relations: [] },
  // medication: { type: Medication, relations: [] },
  // prescription: { type: Prescription, relations: ['patient'] },

  user: { type: User, relations: [] },
  parent: { type: Parent, relations: ['children'] },
  child: { type: Child, relations: ['parent'] },
  csat: { type: Csat, relations: [] },
  appointment: { type: Appointment, relations: [] },
  config: { type: Config, relations: [] },
  product: { type: Product, relations: ['category'] },
  category: { type: Category, relations: ['products'] },
  queue: { type: Queue, relations: [] },
};

@Injectable()
export class CrudService {
  pagesize = 50;

  constructor(private readonly em: EntityManager) {}

  async findAndCount(model: string, where = {}, page = 0, orderBy) {
    console.log('findAndCount', model);
    const [data, count] = await this.em.findAndCount(
      modelmap[model].type,
      where,
      modelmap[model].relations,
      orderBy,
      this.pagesize,
      this.pagesize * page,
    );
    const pageCount = Math.ceil(count / this.pagesize);
    console.log(`returning ${data.length} results.`);
    return { count, pageCount, data };
  }

  async findById(model: string, id: string): Promise<any> {
    return await this.em.findOne(
      modelmap[model].type,
      id,
      modelmap[model].relations,
    );
  }

  async findOneBySearch(model: string, where) {
    return await this.em.findOne(
      modelmap[model].type,
      where,
      modelmap[model].relations,
    );
  }

  async findBySearch(model: string, where) {
    return await this.em.find(
      modelmap[model].type,
      where,
      modelmap[model].relations,
    );
  }

  async save(model: string, json) {
    if (!modelmap[model]) {
      throw new Error(`type '${model}' not defined`);
    }
    const entity = this.em.create(modelmap[model].type, json);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(model: string, id: string, json) {
    try {
      for (const relation of modelmap[model].relations) {
        if (json[relation]?.id) {
          json[relation] = json[relation].id;
        }
      }
      const entity = await this.em.findOne(
        modelmap[model].type,
        { id },
        modelmap[model].relations,
      );
      wrap(entity).assign(json);
      await this.em.persistAndFlush(entity);
      return entity;
    } catch (error) {
      console.error(error);
    }
    return json;
  }

  async remove(model: string, id: string) {
    const entity = await this.em.nativeDelete(modelmap[model].type, id);
    return entity;
  }
}
