import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
const steps = ['Filled', 'Departured', 'On the way','Production House','Completed'];

export default function Tracker(props) {
  const stp=parseInt(props.status)
  //console.log(props)
  const [activeStep, setActiveStep] = React.useState(0);
React.useEffect(()=>{
  if(stp>0)
  setActiveStep(stp)
},[])
React.useEffect(()=>{
  console.log("stp",stp,activeStep)
},[activeStep])
  const isStepOptional = (step) => {
    return true;
  };

  

  const handleNext = () => {
   
    if(activeStep<4)
{
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  props.updateStatus(props.orderId,(activeStep+1))

}
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Card variant="outlined"  style={{padding:"10px",margin:"5px"}}>

      <Stepper activeStep={activeStep} >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
         
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
         
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep+1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            
            <Box sx={{ flex: '1 1 auto' }} />
            

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Card>
  );
}
