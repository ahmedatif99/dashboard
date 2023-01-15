import React from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from "../../theme";
import GeographyChart from '../../components/GeographyChart';

const Geo = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.gray[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  )
}

export default Geo