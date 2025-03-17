import { HashingService } from './index';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('HashingService', () => {
  let hashingService: HashingService;

  beforeEach(() => {
    hashingService = new HashingService();
  });

  const data = 'password123';
  const hashedData = 'hashedPassword123';
  const wrongPassword = 'wrongPassword';

  it('should hash data correctly', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedData);

    const result = await hashingService.hash(data);

    expect(result).toBe(hashedData);
    expect(bcrypt.hash).toHaveBeenCalledWith(data, 12);
  });

  it('should compare data correctly', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const isMatch = await hashingService.compare(data, hashedData);

    expect(isMatch).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(data, hashedData);
  });

  it('should return false for incorrect data comparison', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const isMatch = await hashingService.compare(wrongPassword, hashedData);

    expect(isMatch).toBe(false);
    expect(bcrypt.compare).toHaveBeenCalledWith(wrongPassword, hashedData);
  });

  it('should throw an error if hashing fails', async () => {
    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'));

    await expect(hashingService.hash(data)).rejects.toThrow('Hashing failed');
  });

  it('should throw an error if comparison fails', async () => {
    (bcrypt.compare as jest.Mock).mockRejectedValue(
      new Error('Comparison failed'),
    );

    await expect(hashingService.compare(data, hashedData)).rejects.toThrow(
      'Comparison failed',
    );
  });
});
