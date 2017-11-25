import { fetchHelper } from "../../support";

const apiService = ( ) => ( next ) => ( action ) => {
    const result = next( action );
    if ( !action.async ) {
        return result;
    }
    const { path, method = "GET", body, forwardedIp } = action.payload;

    if ( !path ) {
        throw new Error( `'path' not specified for async action ${ action.type }` );
    }
    let url = `${ path }`;
    const headers = {};
    if ( action.external ) {
        url = path;
    }

    if ( forwardedIp ) {
        headers[ "x-real-ip" ] = forwardedIp;
    }

    return fetchHelper( url, method, headers, body ).then(
        ( res ) => handleResponse( res, action, next ),
        ( err ) => handleErrors( err, action, next )
    );
};

export default apiService;

function handleErrors( err, action, next ) {
    if ( err.status >= 500 ) {
        next( new Error( "there was a problem", err ) );
    }
    next( {
        type: `${ action.type }_FAILED`,
        async: true,
        generalFetching: action.generalFetching,
        payload: err
    } );

    return Promise.reject( { err, type: action.type, payload: action.payload } );
}

function handleResponse( res, action, next ) {
    const redirectUrl = res.redirectUrl || ( res.contentNode && res.contentNode.redirectUrl );
    if ( redirectUrl ) {
        next( {
            type: `${ action.type }_REDIRECTED`,
            payload: redirectUrl
        } );
        return res;
    }

    next( {
        type: `${ action.type }_COMPLETED`,
        async: true,
        generalFetching: action.generalFetching,
        payload: res
    } );

    return res;
}
