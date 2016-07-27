#JWT proof of concept

This PoC uses JWT to verify a logged in user and ensure that only verified users can gain access to the /protected route and page template.

##Live Prototype
Can be found at http://jonwade.digital/jwt-poc

##Overview

The username is taken from the input on the homepage and the API is called using the /login enpoint. If the username is authorised (in the proof of concept only the username 'testuser' is authorised), the server returns the JWT which has been encrypted with the key 'secretkey'.
 
On successful validation of the username by the server, the returned token is then stored in an AngularJS service.
 
When the 'go to next page' button is clicked, the token is retrieved and the /verify endpoint is called on the server API, where the token is decrypted and compared against the original username payload. If there is a match, the server returns a 200 status and Angular redirects the browser to the /protected page.
 
If the token is not validated, there is no redirect.
 
##Note
 
It is possible to reach the /protected route by typing it into the browser command line, so I have simply created a redirect in the protected page controller in that case so that if no token is present in the Angular service the browser is forced back to the homepage. This is not how it should work in production, but figuring that out wasn't the purpose of this PoC! :)
 
 