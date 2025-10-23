const blocks = require.context( './', true, /\/index\.js$/ );

blocks.keys().forEach( ( blockPath ) => {
	if ( blockPath === './index.js' ) {
		return;
	}

	blocks( blockPath );
} );
