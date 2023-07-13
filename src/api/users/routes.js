const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users',
    handler: (request, h) => handler.getUserHandler(request, h),
  },
];

module.exports = routes;
