import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import NestedData from './NestedData';

interface RowData {
  original: {
    id: string;
    start_time: string;
    end_time: string;
  };
}

interface DetailPanelProps {
  row: RowData;
  expandedRowData: Record<string, any[]>;
  setExpandedRowData: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
  fetchTasks: (chainId: string, row: RowData) => Promise<void>;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  row,
  expandedRowData,
  setExpandedRowData,
  fetchTasks,
}) => {
  const chainId = row.original.id;
  const tasks = expandedRowData[chainId] || [];

  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasksData = async () => {
      if (!expandedRowData[chainId]) {
        setLocalLoading(true);
        setLocalError(false);
        try {
          await fetchTasks(chainId, row);
        } catch (error) {
          setLocalError(true);
        } finally {
          setLocalLoading(false);
        }
      }
    };

    fetchTasksData();
  }, [chainId, row, expandedRowData, fetchTasks]);

  if (localLoading) {
    return (
      <Box p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (localError) {
    return (
      <Box p={2}>
        <Typography color="error">Error loading tasks.</Typography>
      </Box>
    );
  }

  return <NestedData tasks={tasks} />;
};

export default DetailPanel;
