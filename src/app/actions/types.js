
// Action types....
import {mirrorKeys} from '../utilities';

export default mirrorKeys([
  'AUTH_TOKENS_UPDATED',

  'USER_ACCEPTED_TERMS',

  'PHONE_NUMBER_UPDATED',

  'SMS_VERIFICATION_SENT',
  'SMS_VERIFICATION_SEND_FAILURE',

  'SMS_VERIFICATION_CODE_ACCEPTED',
  'SMS_VERIFICATION_CODE_REJECTED',

  'PROFILE_UPDATED',

  'MAP_CREATED',
  'MAP_DELETED',
  'MAP_GPS_TOGGLED'
]);
