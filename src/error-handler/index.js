import { logout } from "../helper-methods";

export const handleErrorIfAvailable = async httpResponse => {
    switch(httpResponse.status) {
        case 200: {
            // Token expired
            // logout();
            break;
        }
        default: {
            const error = await httpResponse.json(); 
            console.log('error :>> ', error);
            throw error;
        }
    }
} 