/*
* ---------------------------------------------------
* Config Routes file
* ---------------------------------------------------
*	-	This file lets you define what handlers this application are using
*
* ---------------------------------------------------
*	Notice:
* ---------------------------------------------------
*	-	Every handler included here must to implement one of these
*	-	"iHandler" or "iRestHandler" Interfaces
*/

export { default as main }		from '../Handler/Rendered/main';
export { default as user }		from '../Handler/Restful/user';
