import { custom, email, nonEmpty, object, pipe, string } from 'valibot';

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

export const webviewOriginWhiteList = [
  'https://app.virtualspace.ai',
  'https://staging-app.virtualspace.ai',
];

export const spaceUrlSchema = custom<string>(
  (input) => typeof input === 'string' ? (input.startsWith(webviewOriginWhiteList[0]) || input.startsWith(webviewOriginWhiteList[1])) : false,
  `Url should be from origin ${webviewOriginWhiteList.join(' or ')}`,
);
