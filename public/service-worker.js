/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/3rdpartylicenses.txt","c9f4d020a61edb99dfe57cc514632fd8"],["/assets/favicon/android-icon-144x144.png","f25a85221f457830a8a6f1effdce40fc"],["/assets/favicon/android-icon-192x192.png","88a0ada1276d7113c06d524c8b811b5a"],["/assets/favicon/android-icon-36x36.png","578d931abdae29e0c812bd30498efee7"],["/assets/favicon/android-icon-48x48.png","9020244b25cda72f7904e6eab9fe6a6c"],["/assets/favicon/android-icon-72x72.png","fbd02f31e3c279e552e709f67c0431fd"],["/assets/favicon/android-icon-96x96.png","5dc7ef5e12bd69274075b740b30f7714"],["/assets/favicon/apple-icon-114x114.png","6bcd5f077300cc265511ca59c5fa639b"],["/assets/favicon/apple-icon-120x120.png","1b1d17be27acd1c64bcdd7ce6156b54c"],["/assets/favicon/apple-icon-144x144.png","f25a85221f457830a8a6f1effdce40fc"],["/assets/favicon/apple-icon-152x152.png","9bd1d741e93dde0a79f7b01f558404d4"],["/assets/favicon/apple-icon-180x180.png","a2f1c75fbfa8e256b90e15733dfe517e"],["/assets/favicon/apple-icon-57x57.png","f478e16746fb1f75010592e612746110"],["/assets/favicon/apple-icon-60x60.png","ef0491e5fdf7856b1e69df052b793e6e"],["/assets/favicon/apple-icon-72x72.png","fbd02f31e3c279e552e709f67c0431fd"],["/assets/favicon/apple-icon-76x76.png","9935ef1a286b27d81dbdfc5aed63ce1c"],["/assets/favicon/apple-icon-precomposed.png","dac4a8924f654382a11350bfc6bd297b"],["/assets/favicon/apple-icon.png","dac4a8924f654382a11350bfc6bd297b"],["/assets/favicon/browserconfig.xml","653d077300a12f09a69caeea7a8947f8"],["/assets/favicon/favicon-16x16.png","73e2c094b5ff4f3736ac3b6935153d5b"],["/assets/favicon/favicon-32x32.png","d2de3b97baa2f461ef168c37e7b9b136"],["/assets/favicon/favicon-96x96.png","5dc7ef5e12bd69274075b740b30f7714"],["/assets/favicon/favicon.ico","4736ee340db5b58bd35b4427c787c34f"],["/assets/favicon/favicon.png","36d6f668c0be8445d314ac5598430852"],["/assets/favicon/manifest.json","b58fcfa7628c9205cb11a1b2c3e8f99a"],["/assets/favicon/ms-icon-144x144.png","f25a85221f457830a8a6f1effdce40fc"],["/assets/favicon/ms-icon-150x150.png","28e5029491b7daf7fd7faa3664619648"],["/assets/favicon/ms-icon-310x310.png","edf268e7ba9f7a3e35d670157774f3f5"],["/assets/favicon/ms-icon-70x70.png","a7ad146cb657225a0594db4bf76701a7"],["/assets/logo.png","36d6f668c0be8445d314ac5598430852"],["/favicon.ico","db0ecbf017213f80142b7f02689d43b4"],["/fontawesome-webfont.674f50d287a8c48dc19b.eot","674f50d287a8c48dc19ba404d20fe713"],["/fontawesome-webfont.912ec66d7572ff821749.svg","912ec66d7572ff821749319396470bde"],["/fontawesome-webfont.af7ae505a9eed503f8b8.woff2","af7ae505a9eed503f8b8e6982036873e"],["/fontawesome-webfont.b06871f281fee6b241d6.ttf","b06871f281fee6b241d60582ae9369b9"],["/fontawesome-webfont.fee66e712a8a08eef580.woff","fee66e712a8a08eef5805a46892932ad"],["/index.html","6bd43935bb5d3d0ce9d838a9f50cec94"],["/inline.21c18a2ef4e7213d3f47.bundle.js","3ceca7b7b533d3c1952f53e80d89bede"],["/main.46114952ebf20b3dc503.bundle.js","fa1d8530c0390ca27001f7fe7133808a"],["/manifest.json","a41311c162fb73122a3fe1eb902b8915"],["/polyfills.ad37cd45a71cb38eee76.bundle.js","78aeb7fd7e8f4241fa3c8dc5ff2da685"],["/styles.bab7b51d79ab43ee5d6e.bundle.css","bab7b51d79ab43ee5d6eda2b70d6c6ce"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^(?!\\/__)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







