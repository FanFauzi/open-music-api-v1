const { nanoid } = require('nanoid');
const InvariantError = require('../../excepcionts/InvariantError');
const NotFoundError = require('../../excepcionts/NotFoundError');

class MusicsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const newAlbum = {
      id, name, year,
    }

    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((music) => music.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Album gagal ditambahkan')
    }
    return id;
  }

  getAlbumById(id) {
    const album = this._albums.filter((n) => n.id === id)[0];

    if (!album) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return album;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui album, id tidak ditemukan');
    }

    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
    }
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal menghapus album, id tidak ditemukan');
    }

    this._albums.splice(index, 1);
  }
}

module.exports = MusicsService;