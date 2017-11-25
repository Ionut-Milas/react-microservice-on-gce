const Helpers = {
    serverSideRender( ) {
        return typeof document === "undefined";
    },
    throttle( action, throttleTimeOut = 500 ) {
        let throttled = false;
        return ( ...args ) => {
            if ( !throttled ) {
                throttled = true;
                action( ...args );
                setTimeout( ( ) => {
                    throttled = false;
                }, throttleTimeOut );
            }
        };
    },
    upperToCamel( string ) {
        return string.charAt( 0 ).toLowerCase() + string.substring( 1 );
    },

    camelToUpper( string ) {
        return string.charAt( 0 ).toUpperCase() + string.substring( 1 );
    },

    openModal( modalType, props ) {
        const event = new CustomEvent( "openModal", {
            detail: {
                modalType,
                props
            }
        } );
        dispatchEvent( event );
    },

    closeModal( ) {
        const event = new CustomEvent( "closeModal", { detail: "Close me" } );
        dispatchEvent( event );
    }

};

export default Helpers;
