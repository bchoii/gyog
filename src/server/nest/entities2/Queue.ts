import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

export enum QueueStatus {
  Open = 'Open',
  Closed = 'Closed',
}

@Entity()
export class Queue extends BaseEntity {
  @Property({ default: QueueStatus.Open })
  @Enum(() => QueueStatus)
  status: QueueStatus;

  @Property({ default: '' })
  contact: string;

  @Property({ default: '' })
  purpose: string;

  @Property({ default: '' })
  code: string;

  @Property({ nullable: true })
  queuetime: Date;
}
