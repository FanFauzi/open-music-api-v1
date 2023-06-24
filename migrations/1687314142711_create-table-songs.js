/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(22)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    performer: {
      type: 'TEXT',
      notNull: true,
    },
    genre: {
      type: 'TEXT',
      notNull: true,
    },
    duration: {
      type: 'integer',
      notNull: false,
    },
    albumId: {
      type: 'VARCHAR(22)',
      notNull: false,
      references: 'albums(id)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
