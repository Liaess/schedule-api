import { Match } from './class-validator';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

class TestClass {
  @Match(TestClass, (o) => o.confirmPassword, {
    message: 'Passwords do not match',
  })
  password: string;

  confirmPassword: string;
}

describe('Match Decorator', () => {
  it('should pass when values match', async () => {
    const obj = plainToClass(TestClass, {
      password: 'password123',
      confirmPassword: 'password123',
    });

    const errors = await validate(obj);
    expect(errors.length).toBe(0);
  });

  it('should fail when values do not match', async () => {
    const obj = plainToClass(TestClass, {
      password: 'password123',
      confirmPassword: 'password456',
    });

    const errors = await validate(obj);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints.Match).toEqual('Passwords do not match');
  });
});
