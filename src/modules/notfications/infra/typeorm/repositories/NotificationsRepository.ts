import { MongoRepository, getMongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';
import INotificationsRepository from '@modules/notfications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notfications/dtos/ICreateNotificationsDTO';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notfication = this.ormRepository.create({
      recipient_id,
      content,
    });

    await this.ormRepository.save(notfication);

    return notfication;
  }
}

export default NotificationsRepository;
