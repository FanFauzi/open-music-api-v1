/* eslint-disable max-len */
const Joi = require('joi');

const currentYear = new Date().getFullYear();
const SongsPayloadSchema = Joi.object({
  title: Joi.string().required(),
  // menambahkan fungsi integer(), min() dan max() untuk memberikan maksimal number yang ditetapkan pada nilai tahun. Tujuannya, untuk meningkatkan keakurasian validasi data.
  year: Joi.number().integer().min(1900).max(currentYear)
    .required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

module.exports = { SongsPayloadSchema };
