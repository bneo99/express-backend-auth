
// Strings
export const paramMissingError = 'One or more of the required parameters was missing.';
export const loginFailedErr = 'Login failed';

// Numbers
export const pwdSaltRounds = 12;

// JWT options
export const jwtMaxAge = Number(process.env.JWT_EXP) || '3d'; //3 days default
