export function getEnv(envVariableName, required = false) {
  const value = process.env[envVariableName];
  if (required && !value) {
    throw new Error(
      `Missing required environment variable '${envVariableName}'`
    );
  }
  return value;
}
