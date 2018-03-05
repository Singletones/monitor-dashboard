'use strict';

angular
    .module('services')
    .factory('authorizationService', [
        'clientId',
        'GSuiteDomain',
        function (clientId, GSuiteDomain) {

            return {
                authInstance: null,
                isAuthorized: false,

                init: function (callback) {
                    var self = this;

                    gapi.load('auth2', function () {
                        gapi.auth2.init({
                            'clientId': clientId,
                            'hosted_domain': GSuiteDomain
                        }).then(function () {
                            self.authInstance = gapi.auth2.getAuthInstance();

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
                },

                getUser: function () {
                    return this.authInstance.currentUser.get();
                }
            };
        }
    ]);
