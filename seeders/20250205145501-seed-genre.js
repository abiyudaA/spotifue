'use strict';
const fs = require ('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let genres = JSON.parse(await fs.readFile('./data/genre.json', 'utf-8'))
    genres = genres.map(s => {
     delete s.id
     return {
       ...s,
       createdAt: new Date (),
       updatedAt: new Date ()
     }
    })
 
    await queryInterface.bulkInsert('Genres', genres, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
