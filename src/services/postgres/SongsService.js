const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const InvariantError = require('../../excepcionts/InvariantError');
const NotFoundError = require('../../excepcionts/NotFoundError');

class SongsService {
  constructor() {
    this.SongPool = new Pool();
  }

  async addSong({
    title,
    year,
    performer,
    genre,
    duration,
    albumId,
    owner,
  }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId, owner],
    };

    const result = await this.SongPool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getSongs(title, performer, owner) {
    let result;

    if (title && performer) {
      result = await this.SongPool.query(`SELECT id, title, performer FROM songs WHERE title ILIKE '%${title}%' AND performer ILIKE '%${performer}%'`);
      return result.rows;
    }

    if (title !== undefined) {
      result = await this.SongPool.query(`SELECT id, title, performer FROM songs WHERE title ILIKE '%${title}%'`);
      return result.rows;
    }

    if (performer !== undefined) {
      result = await this.SongPool.query(`SELECT id, title, performer FROM songs WHERE performer ILIKE '%${performer}%'`);
      return result.rows;
    }

    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE owner = $1',
      values: [owner],
    };

    result = await this.SongPool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this.SongPool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return result.rows[0];
  }

  async editSongById(id, {
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5 WHERE id = $6 RETURNING id',
      values: [title, year, performer, genre, duration, id],
    };

    const result = await this.SongPool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.SongPool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;
