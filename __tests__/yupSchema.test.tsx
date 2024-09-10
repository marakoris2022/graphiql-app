import { createValidationSchema, FormUserData } from '@/utils/yupSchema';
import { object } from 'yup';

describe('createValidationSchema', () => {
  const mockTranslate = (key: string) => {
    const translations: Record<string, string> = {
      invalidEmail: 'Invalid email',
      passwordRequired: 'Password is required',
      passwordOneLetter: 'Password must contain at least one letter',
      passwordNumber: 'Password must contain at least one number',
      passwordSpecialCharacter:
        'Password must contain at least one special character',
      passwordLength: 'Password must be at least 8 characters long',
      nameRequired: 'Name is required',
    };
    return translations[key];
  };

  it('should return an error for invalid password complexity', async () => {
    const schema = createValidationSchema(mockTranslate);
    const invalidUserData: FormUserData = { password: '1234567' };

    await expect(schema.validate(invalidUserData)).rejects.toThrow(
      'Password must contain at least one letter'
    );
  });

  it('should pass validation for valid user data', async () => {
    const schema = createValidationSchema(mockTranslate);
    const validUserData: FormUserData = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    await expect(schema.validate(validUserData)).resolves.toBeTruthy();
  });
});
