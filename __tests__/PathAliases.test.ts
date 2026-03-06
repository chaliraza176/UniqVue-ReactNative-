/**
 * Path Aliases Test
 * Verifies that TypeScript path aliases are working correctly
 */

import { API_CONFIG, SUBSCRIPTION_TIERS } from '@config/index';
import { validateEmail, validatePassword } from '@utils/index';

describe('Path Aliases', () => {
  it('should import from @config', () => {
    expect(API_CONFIG).toBeDefined();
    expect(API_CONFIG.BASE_URL).toBeDefined();
    expect(SUBSCRIPTION_TIERS).toBeDefined();
  });

  it('should import from @utils', () => {
    expect(validateEmail).toBeDefined();
    expect(validatePassword).toBeDefined();
  });

  it('should validate email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('should validate password correctly', () => {
    expect(validatePassword('password123')).toBe(true);
    expect(validatePassword('short')).toBe(false);
  });
});
