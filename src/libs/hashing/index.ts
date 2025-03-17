import * as bcrypt from 'bcrypt';

export abstract class HashingServiceProtocol {
  abstract hash(data: string): Promise<string>;
  abstract compare(data: string, encrypted: string): Promise<boolean>;
}

export class HashingService implements HashingServiceProtocol {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 12);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
