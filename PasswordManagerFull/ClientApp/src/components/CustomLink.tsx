import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomLink = styled(Link)({
    color: '#8F8483',
    fontFamily: 'var(--font-tomorrow)',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '3.2px',
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    textDecorationSkipInk: 'none',
    textUnderlineOffset: '4px',
    textUnderlinePosition: 'under',
    cursor: 'pointer',
    '&:hover': {
        color: '#6D3230',
    }
});

export default CustomLink; 