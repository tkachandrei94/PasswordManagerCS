import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Grid,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTitle from '../components/CustomTitle';
import CustomButton from '../components/CustomButton';
import PasswordGenerator from '../components/PasswordGenerator';
import PasswordList from '../components/PasswordList';
import AddPasswordForm from '../components/AddPasswordForm';
import { generatePassword } from '../utils/passwordUtils';

export default function Passwords() {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState([]);
    const [newPassword, setNewPassword] = useState({
        title: '',
        password: ''
    });
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Стан для генератора паролів
    const [passwordLength, setPasswordLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                setIsAuthorized(true);
            } catch (error) {
                console.error('Помилка перевірки авторизації:', error);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    useEffect(() => {
        // Перевірка валідності токена
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!res.ok) {
                    console.log('Invalid token, redirecting to login');
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }

                // Токен валідний, завантажуємо паролі
                fetchPasswords();
                // Генеруємо початковий пароль
                handleGeneratePassword();
            } catch (error) {
                console.error('Auth check error:', error);
            }
        };

        checkAuth();
    }, []);

    // Ефект для генерації нового пароля при зміні параметрів
    useEffect(() => {
        handleGeneratePassword();
    }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const fetchPasswords = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const res = await fetch('/api/passwords', { headers });

            if (!res.ok) {
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    throw new Error('Session expired. Please login again.');
                }
                throw new Error('Failed to fetch passwords');
            }

            const data = await res.json();
            // Перевіряємо структуру відповіді
            if (data.data && Array.isArray(data.data)) {
                setPasswords(data.data);
            } else if (Array.isArray(data)) {
                setPasswords(data);
            } else {
                console.error('Unexpected response format:', data);
                setPasswords([]);
            }
        } catch (error) {
            console.error('Error fetching passwords:', error);
            // (error instanceof Error ? error.message : 'Failed to load passwords');
            setPasswords([]);
        } finally {
        }
    };

    const handleAddPassword = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };
            const res = await fetch('/api/passwords', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    title: newPassword.title,
                    password: newPassword.password,
                }),
            });

            if (res.ok) {
                setNewPassword({ title: '', password: '' });
                setNewPassword({ title: '', password: '' });
                fetchPasswords();
            }
        } catch (error) {
            console.error('Error adding password:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const togglePasswordVisibility = (passwordId) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [passwordId]: !prev[passwordId]
        }));
    };

    // Функція генерації пароля
    const handleGeneratePassword = () => {
        const password = generatePassword(
            passwordLength,
            includeLowercase,
            includeUppercase,
            includeNumbers,
            includeSymbols
        );

        setNewPassword(prev => ({
            ...prev,
            password
        }));
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleTitleChange = (e) => {
        setNewPassword({
            ...newPassword,
            title: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setNewPassword({
            ...newPassword,
            password: e.target.value
        });
    };

    if (!isAuthorized) return null;

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 12.5, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <CustomTitle
                    >
                        Password Manager
                    </CustomTitle>
                    <CustomButton
                        onClick={handleLogout}
                        size="small"
                        sx={{ p: '8px 20px', backgroundColor: 'unset', border: '2px solid #BD787D', color: '#BD787D', fontWeight: 400 }}
                    >
                        Logout
                    </CustomButton>
                </Box>

                <Grid container spacing={6}>
                    {/* Ліва колонка - форма додавання пароля та список паролів */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            backgroundColor: 'rgba(221, 209, 220, 0.05)',
                            p: 3,
                            borderRadius: '16px',
                            height: '100%'
                        }}>
                            <AddPasswordForm
                                title={newPassword.title}
                                password={newPassword.password}
                                showPassword={showPassword}
                                onTitleChange={handleTitleChange}
                                onPasswordChange={handlePasswordChange}
                                onTogglePasswordVisibility={handleTogglePasswordVisibility}
                                onGeneratePassword={handleGeneratePassword}
                                onSubmit={handleAddPassword}
                            />

                            <PasswordList
                                passwords={passwords}
                                visiblePasswords={visiblePasswords}
                                togglePasswordVisibility={togglePasswordVisibility}
                            />
                        </Box>
                    </Grid>

                    {/* Права колонка - генератор паролів */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            backgroundColor: 'rgba(221, 209, 220, 0.05)',
                            p: 3,
                            borderRadius: '16px',
                            height: '100%'
                        }}>
                            <PasswordGenerator
                                passwordLength={passwordLength}
                                setPasswordLength={setPasswordLength}
                                includeLowercase={includeLowercase}
                                setIncludeLowercase={setIncludeLowercase}
                                includeUppercase={includeUppercase}
                                setIncludeUppercase={setIncludeUppercase}
                                includeNumbers={includeNumbers}
                                setIncludeNumbers={setIncludeNumbers}
                                includeSymbols={includeSymbols}
                                setIncludeSymbols={setIncludeSymbols}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    );
} 