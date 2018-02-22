'use strict';

angular
    .module('services')
    .factory('authorizationService', [
        'apiKey',
        'clientId',
        'scope',
        'discoveryDocs',
        function (apiKey, clientId, scope, discoveryDocs) {

            return {
                authInstance: null,
                isAuthorized: false,

                init: function (callback) {
                    var self = this;

                    gapi.load('client:auth2', function () {
                        gapi.client.init({
                            // 'apiKey': apiKey,
                            'clientId': clientId,
                            'scope': scope
                            // 'discoveryDocs': discoveryDocs
                        }).then(function () {
                            self.authInstance = gapi.auth2.getAuthInstance();

                            // Listen for sign-in state changes.
                            function listener(isSignedIn) {
                                self.isAuthorized = !!isSignedIn;
                                callback(isSignedIn);
                            }
                            self.authInstance.isSignedIn.listen(listener);

                            listener(self.authInstance.isSignedIn.get());
                        });
                    });
                },

                getInstance: function () {
                    return this.authInstance;
                }
            };
        }
    ]);
