import {
  DEFAULT_SUBJECT,
  generateSignupContent,
  generateSignupSubject,
  signUpRedirectUrl,
} from '@users/constants/email/create';
import { REDIRECT_URL_MOCK, USER_MOCK } from '@users/mocks';

const mockConfigIsProd = jest.fn();
jest.mock('@config/index', () => ({
  isProd: () => mockConfigIsProd(),
}));

describe('create', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a valid html string', () => {
    const user = {
      name: USER_MOCK.name,
      redirectUrl: REDIRECT_URL_MOCK,
    };

    const email = generateSignupContent(user.name, user.redirectUrl);

    expect(email).toContain(user.name);
    expect(email).toContain(user.redirectUrl);
  });

  it('should return a valid subject', () => {
    const subject = generateSignupSubject();

    expect(subject).toContain(DEFAULT_SUBJECT);
  });

  it('should return valid redirect url when isProd is true', () => {
    mockConfigIsProd.mockReturnValue(true);

    const activationCode = '123456';

    const redirectUrl = signUpRedirectUrl(activationCode);

    expect(redirectUrl).not.toContain('localhost');
    expect(redirectUrl).toContain(activationCode);
  });

  it('should return valid redirect url when isProd is false', () => {
    mockConfigIsProd.mockReturnValue(false);
    const activationCode = '123456';
    const redirectUrl = signUpRedirectUrl(activationCode);

    expect(redirectUrl).toContain('localhost');
    expect(redirectUrl).toContain(activationCode);
  });
});
