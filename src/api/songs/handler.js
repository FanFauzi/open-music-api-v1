class SongsHandler {
  constructor(service, validator) {
    this.SongService = service;
    this.validator = validator;
  }

  async postSongHandler(request, h) {
    this.validator.validateSongPayload(request.payload);
    const {
      title = 'untitled',
      year,
      performer,
      genre,
      duration,
      albumId,
    } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const songId = await this.SongService.addSong({
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
      owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getAllSongsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { title, performer } = request.query;
    const songs = await this.SongService.getSongs(title, performer, credentialId);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this.SongService.verifySongOwner(id, credentialId);
    const song = await this.SongService.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    this.validator.validateSongPayload(request.payload);
    const {
      title,
      year,
      performer,
      genre,
      duration,
    } = request.payload;
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this.SongService.verifySongOwner(id, credentialId);
    await this.SongService.editSongById(
      id,
      {
        title,
        year,
        performer,
        genre,
        duration,
      },
    );

    return {
      status: 'success',
      message: 'Song berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this.SongService.verifySongOwner(id, credentialId);
    await this.SongService.deleteSongById(id);

    return {
      status: 'success',
      message: 'Song berhasil dihapus',
    };
  }
}

module.exports = SongsHandler;
