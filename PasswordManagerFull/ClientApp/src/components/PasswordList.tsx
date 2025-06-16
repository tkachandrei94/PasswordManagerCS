import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    IconButton,
    Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Password {
    _id: string;
    title: string;
    password: string;
}

interface PasswordListProps {
    passwords: Password[];
    visiblePasswords: { [key: string]: boolean };
    togglePasswordVisibility: (passwordId: string) => void;
}

const PasswordList: React.FC<PasswordListProps> = ({
    passwords,
    visiblePasswords,
    togglePasswordVisibility
}) => {
    return (
        <List sx={{ mt: 6 }}>
            {Array.isArray(passwords) && passwords.length > 0 ? (
                passwords.map((pwd) => (
                    <Box
                        key={pwd._id}
                        sx={{
                            mb: 2,
                            px: 3,
                            borderRadius: '50vh',
                            border: '1px solid #BD787D',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ flex: 1, mr: 2 }}>
                            <Box sx={{
                                fontFamily: 'var(--font-tomorrow)',
                                color: '#BD787D',
                                fontSize: '14px',
                                letterSpacing: '3.2px',
                            }}>
                                {pwd.title}
                            </Box>
                            <Box sx={{
                                fontFamily: 'var(--font-tomorrow)',
                                color: '#BD787D',
                                fontSize: '14px',
                                letterSpacing: '2.8px'
                            }}>
                                {visiblePasswords[pwd._id] ? pwd.password : '••••••••••••'}
                            </Box>
                        </Box>
                        <IconButton
                            edge="end"
                            onClick={() => togglePasswordVisibility(pwd._id)}
                            sx={{ color: '#BD787D' }}
                        >
                            {visiblePasswords[pwd._id] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Box>
                ))
            ) : (
                <Box>
                    <Box sx={{
                        fontFamily: 'var(--font-tomorrow)',
                        color: '#833D3B',
                        p: 2,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        No passwords found
                    </Box>
                </Box>
            )}
        </List>
    );
};

export default PasswordList; 