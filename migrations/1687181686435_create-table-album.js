/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(22)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'smallserial',
      notNull: true,
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('albums');
};
