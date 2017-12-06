import {defaultRole, registeredRoles} from '../config/roles';

export default function roleValidation(val: string) {
	return ( registeredRoles.indexOf(val) === -1 ) ? defaultRole : val;
}
