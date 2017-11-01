"use strict";
const { join }			= require('path');
const { copyFileSync }			= require('fs');
const origin			= join( __dirname , '../examples','.env.example' );
const destiny			= join( __dirname , '../','.env' );

return copyFileSync(origin, destiny);
