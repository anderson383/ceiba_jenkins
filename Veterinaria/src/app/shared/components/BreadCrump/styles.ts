import {makeStyles} from '@material-ui/core';
import styled from 'styled-components';

export const TitlePage = styled.span`
    font-size: 25px;
    margin-right: 7px;
    color: #636363;
`;


export const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        borderRadius: 7
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20
    }
}));


