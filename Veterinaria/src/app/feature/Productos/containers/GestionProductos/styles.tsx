import * as Material from '@material-ui/core';
import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

interface StyledTabProps {
    label: string;
  }

export const useStyles = Material.makeStyles((theme) => ({
    cardContenedor: {
        background: '#FFFFFF',
        padding: 10,
        borderRadius: 7,
        boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    },
}));

export const AntTabs = Material.withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Material.Tabs);


export const AntTab = Material.withStyles((theme: Material.Theme) =>
    Material.createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Material.Tab disableRipple {...props} />);