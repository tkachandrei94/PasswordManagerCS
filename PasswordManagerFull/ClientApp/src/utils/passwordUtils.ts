export function generatePassword(
    length: number,
    includeLowercase: boolean,
    includeUppercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean
): string {
    let chars = '';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+[]{}|;:,.<>?';
    
    // Якщо жоден параметр не вибрано, використовуємо малі літери за замовчуванням
    if (chars === '') chars = 'abcdefghijklmnopqrstuvwxyz';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    return password;
} 