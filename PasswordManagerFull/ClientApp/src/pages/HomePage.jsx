import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Box } from '@mui/material';

export default function Home() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            navigate(token ? '/passwords' : '/login');
        } catch (error) {
            console.error('Помилка перевірки токена:', error);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    if (!isLoading) return null;

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        </Container>
    );
} 