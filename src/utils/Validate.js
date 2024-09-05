export const validateDate = (selectedDate) => {
    const today = new Date();
    const inputDate = new Date(selectedDate);

    if (!selectedDate) {
      return 'Date is required';
    }
    if (inputDate < today.setHours(0, 0, 0, 0)) {
      return 'Date cannot be in the past';
    }
    return '';
};
  
export const validateProcedure = (value) => {
    
    if (value === "none" ) {
      return 'Please select a procedure';
    }
    return ' ';
};
  
export const validateSurgeon = (value) => {
    if (value === 'none') {
      return 'Please select a surgeon';
    }
    return '';
};
  
export const validateAnesthesia = (value) => {
    if (value === 'none') {
      return 'Please select an anesthesia type';
    }
    return '';
};
  

export const validateAnesthesiologist = (value) => {
    if (value === 'none') {
      return 'Please select an anesthesiologist';
    }
    return '';
};
  
export const validateDoctor = (value) => {
    if (value === 'none') {
      return 'Please select an anesthesiologist';
    }
    return '';
};
  
export  const validatePatientType = () => {
    if (!patientType) {
      return 'Please select a patient type';
    }
    return '';
};
  