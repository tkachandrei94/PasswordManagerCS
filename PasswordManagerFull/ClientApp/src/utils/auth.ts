import jwt from 'jsonwebtoken';

// Секретний ключ для JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Інтерфейс для корисного навантаження токена
interface TokenPayload {
    userId: string;
    isAdmin?: boolean;
}

// Генерація JWT токена
export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

// Перевірка JWT токена
export function verifyToken(token: string): TokenPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        throw new Error('Недійсний токен');
    }
}

// Декодування токена без перевірки підпису
export function decodeToken(token: string): TokenPayload | null {
    try {
        return jwt.decode(token) as TokenPayload;
    } catch {
        return null;
    }
} 