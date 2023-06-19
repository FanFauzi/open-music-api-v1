const routes = (handler) => [
// ALBUMS
  {
    method: 'POST',
    path: '/albums',
    handler: (request, h) => handler.postAlbumHandler(request, h),
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (request, h) => handler.getAlbumByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (request, h) => handler.putAlbumByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (request, h) => handler.deleteAlbumByIdHandler(request, h),
  },
// SONGS
  // {
  //   method: 'POST',
  //   path: '/songs',
  //   handler: (request, h) => handler.addSongHandler(request, h),
  // },
  // {
  //   method: 'GET',
  //   path: '/songs',
  //   handler: (request, h) => handler.getAllSongsHandler(request, h),
  // },
  // {
  //   method: 'GET',
  //   path: '/albums/{id}',
  //   handler: (request, h) => handler.getSongByIdHandler(request, h),
  // },
  // {
  //   method: 'PUT',
  //   path: '/songs/{id}',
  //   handler: (request, h) => handler.editSongByIdHandler(request, h),
  // },
  // {
  //   method: 'DELETE',
  //   path: '/songs/{id}',
  //   handler: (request, h) => handler.deleteSongByIdHandler(request, h),
  // },
];

module.exports = routes;
