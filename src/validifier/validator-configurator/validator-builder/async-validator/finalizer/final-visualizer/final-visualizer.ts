import activeAsyncsCounter from './_lib/active-asyncs-counter';

export default (settings, errorConfigs, control, validatorName, validationStatus) => {
  let {validify} = control;
  let {asyncStatuses, asyncProgressVisualizer, validationStater} = validify;
  
  if(!activeAsyncsCounter(asyncStatuses)) {
    asyncProgressVisualizer.pending(false);
    
    if(!validationStatus && control.valid) {
      asyncProgressVisualizer.success(true);
      errorConfigs.successTimeout = setTimeout(() => {
        asyncProgressVisualizer.success(false);
        asyncProgressVisualizer.container(false);
      }, settings.asyncSuccessMessageDuration);
    }
  }
  
  validationStater.set(validatorName, validationStatus).updateDependents().visualize();
};
