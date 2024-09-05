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