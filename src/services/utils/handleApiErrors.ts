const handleApiErrors = (error : Error, callbackFn? : () => void ) => {
  console.error(error);

  return callbackFn ? callbackFn() : false;
}

export default handleApiErrors;