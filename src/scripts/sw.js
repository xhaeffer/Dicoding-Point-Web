import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

import CONFIG from './globals/config';

precacheAndRoute(self.__WB_MANIFEST);

const restaurantApi = new Route(
  ({ url }) => url.href.startsWith(CONFIG.BASE_URL),
  new StaleWhileRevalidate({
    cacheName: 'dicoding-restaurant-api',
  }),
);

const restaurantImgApi = new Route(
  ({ url }) => url.href.startsWith(CONFIG.BASE_URL_IMAGE),
  new StaleWhileRevalidate({
    cacheName: 'themoviedb-image-api',
  }),
);

registerRoute(restaurantApi);
registerRoute(restaurantImgApi);

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  const notificationData = {
    title: 'Push Notification',
    options: {
      body: 'This is a push notification',
      icon: './favicon.ico',
      image: './icons/icon512_maskable.png',
    },
  };

  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options,
  );

  event.waitUntil(showNotification);
});
