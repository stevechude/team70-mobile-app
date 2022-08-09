import bcrypt from 'bcrypt';

export const comparePassword = (plainText: string, hash: string) => {
    return bcrypt.compare(plainText, hash)
};