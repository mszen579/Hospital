import { createConfirmation } from 'react-confirm';

// create confirm function
const confirm = createConfirmation('Want to delete?');

// This is optional. But I recommend to define your confirm function easy to call.
export default function(confirmation, options = {}) {
 // You can pass whatever you want to the component. These arguments will be your Component's props
 return confirm({ confirmation, options });
}