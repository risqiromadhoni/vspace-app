import { email, nonEmpty, object, pipe, string } from 'valibot';

export const loginFormSchema = object({
  email: pipe(
    string(),
    nonEmpty('Please enter your email address'),
    email('Invalid email address'),
  ),
  password: pipe(
    string(),
    nonEmpty('Please enter your password'),
  ),
});
