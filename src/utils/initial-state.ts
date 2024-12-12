type FormState = {
  status: 'success' | 'error' | string;
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

const formState: FormState = {
  status: '',
  message: '',
  errors: {},
};

export { formState, type FormState };