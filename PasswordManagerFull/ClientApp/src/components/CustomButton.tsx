import { styled, Button } from '@mui/material';

const CustomButton = styled(Button)({
    borderRadius: '50vh',
    background: '#833D3B',
    color: '#8F8483',
    fontFamily: 'var(--font-tomorrow)',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '3.2px',
    padding: '18px 30px',
    textTransform: 'uppercase',
    '&:hover': {
        background: '#6D3230',
    },
    '&:disabled': {
        background: '#B38D8C',
        color: '#A99E9D',
    }
});

export default CustomButton; 