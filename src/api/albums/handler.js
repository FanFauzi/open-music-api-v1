/* eslint-disable no-underscore-dangle */
class AlbumsHandler {
  constructor(service, validator) {
    this._albumService = service;
    this.validator = validator;
  }

  async postAlbumHandler(request, h) {
    this.validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;
    const albumId = await this._albumService.addAlbum({ name, year });
    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._albumService.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this.validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;
    const { id } = request.params;

    await this._albumService.editAlbumById(id, { name, year });

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._albumService.deleteAlbumById(id);
    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
