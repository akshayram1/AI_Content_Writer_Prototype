import React from 'react';
import { Box, Container, Fade } from '@mui/material';
import WorkflowStepper from '../workflow/WorkflowStepper';
import KeywordResearch from '../workflow/KeywordResearch';
import TitleGeneration from '../workflow/TitleGeneration';
import TopicSelection from '../workflow/TopicSelection';
import ContentCreation from '../workflow/ContentCreation';
import { useApp } from '../../context/AppContext';

const Dashboard = () => {
    const { state } = useApp();

    const renderCurrentStep = () => {
        const components = {
            0: <KeywordResearch />,
            1: <TitleGeneration />,
            2: <TopicSelection />,
            3: <ContentCreation />,
        };

        return components[state.currentStep] || <KeywordResearch />;
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                py: 3,
            }}
        >
            <Container maxWidth="xl">
                <Fade in timeout={500}>
                    <Box>
                        <WorkflowStepper />
                        <Box sx={{ mt: 3 }}>
                            <Fade in timeout={300} key={state.currentStep}>
                                <Box>
                                    {renderCurrentStep()}
                                </Box>
                            </Fade>
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Dashboard;
