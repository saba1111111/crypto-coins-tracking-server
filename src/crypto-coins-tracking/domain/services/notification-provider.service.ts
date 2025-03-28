export interface NotificationProviderService {
  notify(data: {
    to: string;
    topic?: string;
    message: string;
  }): Promise<boolean>;
}
