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
   let songs = JSON.parse(await fs.readFile('./data/songs.json', 'utf-8'))
   songs = songs.map(s => {
    delete s.id
    return {
      ...s,
      createdAt: new Date (),
      updatedAt: new Date ()
    }
   })

   await queryInterface.bulkInsert('Songs', songs, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
