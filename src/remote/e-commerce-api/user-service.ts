import { ResetRequest } from '../../models/ResetRequest';
import eCommerceClient, { eCommerceApiResponse } from './eCommerceClient';
const baseURL = '/auth';

export const apiUpdateUser = async (
    newFirstName: string,
    newLastName: string,
    newEmail: string,
    oldPassword: string,
    newPassword: string,
) => {
    const response = await eCommerceClient.patch<ResetRequest>(`${baseURL}/reset`, {
        newFirstName: newFirstName,
        newLastName: newLastName,
        newEmail: newEmail,
        oldPassword: oldPassword,
        newPassword: newPassword,
    });
    return { status: response.status, payload: response.data };
};
