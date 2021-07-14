const { merge } = require( 'webpack-merge' );
const commonConfig = require( './config/webpack.common' );

module.exports = ( env, argv ) => {
    const mode = ( argv.mode === 'development' ) ? 'development' : 'production';
    // console.log( mode );
    const modeConfig = require(`./config/webpack.${mode}`);
    console.log(modeConfig);
    return merge( commonConfig, modeConfig );
}