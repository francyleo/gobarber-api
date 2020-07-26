import { injectable, inject } from 'tsyringe';

import Notification from '../infra/typeorm/schemas/Notification';
import INotificationsRepository from '../repositories/INotificationsRepository';

interface IRequest {
  content: string;
  recipient_id: string;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    content,
    recipient_id,
  }: IRequest): Promise<Notification> {
    const notification = await this.notificationsRepository.create({
      content,
      recipient_id,
    });

    return notification;
  }
}

export default CreateNotificationService;
