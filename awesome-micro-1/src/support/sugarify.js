/* eslint no-extend-native: 0 */ // --> OFF

Array.prototype.first = function( ) {
    return this[ 0 ];
};

Array.prototype.firstOrDefault = function( ) {
    return this.length > 0 ? this[ 0 ] : { };
};

Array.prototype.last = function( ) {
    return this[ this.length - 1 ];
};

Array.prototype.contains = function( val ) {
    return this.indexOf( val ) >= 0;
};

Array.prototype.hasItems = function( ) {
    return this.length > 0;
};

Array.prototype.clear = function( ) {
    this.splice( 0, this.length );
};

Array.prototype.having = function( property, value ) {
    return this.filter( function( el ) {
        if ( el[ property ] && value && typeof ( el[ property ] ) === "string" ) {
            return el[ property ].toLowerCase( ) === value.toLowerCase( );
        }

        return el[ property ] === value;
    } );
};

Array.prototype.except = function( property, value ) {
    return this.filter( function( el ) {
        if ( el[ property ] && value && typeof ( el[ property ] ) === "string" ) {
            return el[ property ].toLowerCase( ) !== value.toLowerCase( );
        }

        return el[ property ] !== value;
    } );
};

Array.prototype.pluck = function( property ) {
    return this.map( function( el ) {
        return el[ property ];
    } );
};

Array.prototype.flatten = function( ) {
    if ( this.length === 0 ) {
        return [ ];
    }

    return this.reduce( function( a, b ) {
        return a.concat( b );
    } );
};
