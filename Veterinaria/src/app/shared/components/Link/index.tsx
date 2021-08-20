import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(RouterLink)`
  text-decoration: none;
  font-size: 12px;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
  i { 
    font-style: normal;
    color: #636363;
  }
`;
