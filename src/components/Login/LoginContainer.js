import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import { config } from '../../utils/oktaConfig';

/*
// username: test001@lambdaschooluser.com
// pass: TestUser001

user: testuser002@lambdaschooluser.com
pass: Test002Test

*/

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        parseSchema: function(schema, onSuccess, onFailure) {
          // handle parseSchema callback
          console.log({ schema, onSuccess, onFailure });
          onSuccess(schema);
        },
        preSubmit: function(postData, onSuccess, onFailure) {
          // handle preSubmit callback
          console.log({ postData, onSuccess, onFailure });
          onSuccess(postData);
        },
        postSubmit: function(response, onSuccess, onFailure) {
          // handle postSubmit callback
          console.log({ response, onSuccess, onFailure });
          onSuccess(response);
        },
      },
      features: {
        // turning this feature on allows your widget to use Okta for user registration
        registration: true,
      },
      logo: 'path-to-your-logo',
      // add your custom logo to your signing/register widget here.
      i18n: {
        en: {
          'primaryauth.title': 'Reach LMS',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  return <div id="sign-in-widget" />;
};

export default LoginContainer;
