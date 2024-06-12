// toastUtils.ts

import { toast } from 'react-toastify';

// Function to display a toast for successful login
export const loginSuccessToast = () => toast("Login Success");

// Function to display a toast for invalid email or password
export const invalidCredentialsToast = () => toast("Invalid email or password");

// Function to display a generic error toast
export const genericErrorToast = () => toast("An error occurred. Please try again later.");

export const loginFailToast = () => toast("Login Failed");
