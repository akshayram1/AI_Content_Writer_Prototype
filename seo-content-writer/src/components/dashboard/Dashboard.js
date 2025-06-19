import React from 'react';
import { Box } from '@mui/material';
import WorkflowStepper from '../workflow/WorkflowStepper';
import KeywordResearch from '../workflow/KeywordResearch';
import TitleGeneration from '../workflow/TitleGeneration';
import TopicSelection from '../workflow/TopicSelection';
import ContentCreation from '../workflow/ContentCreation';
import { useApp } from '../../context/AppContext';

const Dashboard = () => {
    const { state } = useApp();

    const renderCurrentStep = () => {
        switch (state.currentStep) {
            case 0:
                return <KeywordResearch />;
            case 1:
                return <TitleGeneration />;
            case 2:
                return <TopicSelection />;
            case 3:
                return <ContentCreation />;
            default:
                return <KeywordResearch />;
        }
    };

    return (
        <Box>
            <WorkflowStepper />
            <Box mt={4}>
                {renderCurrentStep()}
            </Box>
        </Box>
    );
};

export default Dashboard;
