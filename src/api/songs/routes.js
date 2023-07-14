const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: (request, h) => handler.postSongHandler(request, h),
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/songs',
    handler: (request, h) => handler.getAllSongsHandler(request, h),
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (request, h) => handler.getSongByIdHandler(request, h),
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (request, h) => handler.putSongByIdHandler(request, h),
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (request, h) => handler.deleteSongByIdHandler(request, h),
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;
