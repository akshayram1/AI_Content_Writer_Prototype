import React from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
    Box,
    Typography,
} from '@mui/material';
import { useApp } from '../../context/AppContext';
import { WORKFLOW_STEPS } from '../../utils/constants';

const WorkflowStepper = () => {
    const { state } = useApp();

    return (
        <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Content Creation Workflow
            </Typography>

            <Stepper activeStep={state.currentStep} orientation="horizontal" sx={{ mt: 2 }}>
                {WORKFLOW_STEPS.map((step, index) => (
                    <Step key={step.label} completed={state.currentStep > index}>
                        <StepLabel>
                            <Box>
                                <Typography variant="subtitle2">
                                    {step.label}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {step.description}
                                </Typography>
                            </Box>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Paper>
    );
};

export default WorkflowStepper;
