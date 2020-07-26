import CreateNotificationsService from './CreateNotificationService';
import FakeNotificationsReporitory from '../repositories/fakes/FakeNotificationsRepository';

let createNotifications: CreateNotificationsService;
let fakeNotificationsReporitory: FakeNotificationsReporitory;

describe('CreateNotificationsService', () => {
  beforeEach(() => {
    fakeNotificationsReporitory = new FakeNotificationsReporitory();

    createNotifications = new CreateNotificationsService(
      fakeNotificationsReporitory,
    );
  });

  it('should be able to create new notification', async () => {
    const notification = await createNotifications.execute({
      content: 'new notification',
      recipient_id: 'user-id',
    });

    expect(notification).toHaveProperty('id');
    expect(notification.content).toBe('new notification');
    expect(notification.recipient_id).toBe('user-id');
  });
});
