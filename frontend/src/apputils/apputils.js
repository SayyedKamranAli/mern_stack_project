import {toast} from 'react-toastify'

// export const SHOW_ERROR_NOTIFICATION = (error) => {
//     NotificationManager.error(error, "", 8000);
//   };

export const SHOW_ERROR_NOTIFICATION = (error)=>{
    toast.error(error)
}

export const SHOW_SUCCESS_NOTIFICATION = (msg)=>{
    console.log('utils message',msg)
    toast.success(msg)
}