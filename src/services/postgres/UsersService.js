const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../excepcionts/InvariantError');
const NotFoundError = require('../../excepcionts/NotFoundError');

class UsersService {
  constructor() {
    this.UserPool = new Pool();
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.UserPool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan');
    }
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this.UserPool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, username, fullname, FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this.UserPool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }
  }
}

module.exports = UsersService;
