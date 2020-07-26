import { ObjectID } from 'mongodb';

import Notification from '../../infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notfications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notfications/dtos/ICreateNotificationsDTO';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notfication = new Notification();

    Object.assign(notfication, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notfication);

    return notfication;
  }
}

export default FakeNotificationsRepository;
