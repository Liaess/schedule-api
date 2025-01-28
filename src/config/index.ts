export const isLocal = (): boolean => process.env.NODE_ENV === 'local';
export const isProd = (): boolean => process.env.NODE_ENV === 'production';
