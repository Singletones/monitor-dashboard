angular.module('models')
    .factory('ZoneActivityModel', [
        () => class {

            constructor({
                pivots,
                lookback,
                candleRes,
                marketPosition,
                lookbackStart,
                datetime,
                status,
                zoneType,
                zoneTop,
                zoneBottom
            } = {}) {
                this._status = status;
                this._marketPosition = marketPosition;
                this._zone = {
                    type: zoneType,
                    top: zoneTop,
                    bottom: zoneBottom,
                    color: zoneType === 'Buy' ? 'rgb(0,0,255)' : 'rgb(255,0,0)'
                };
                this._lookback = lookback;
                this._candleRes = candleRes;
                this._fromDate = lookbackStart;
                this._toDate = datetime;

                this._pivots = pivots;
            }

            unpackPivotsXaxis(type, format) {
                return this._pivots.reduce((toUnpack, pivot) => {
                    if (pivot.type === type) {
                        toUnpack.push(pivot.x.format(format || 'MM-DD HH:mm:ss'));
                    }
                    return toUnpack;
                }, [])
            }

            unpackPivotsYaxis(type) {
                return this._pivots.reduce((toUnpack, pivot) => {
                    if (pivot.type === type) {
                        toUnpack.push(pivot.y);
                    }
                    return toUnpack;
                }, [])
            }

        }
    ]);