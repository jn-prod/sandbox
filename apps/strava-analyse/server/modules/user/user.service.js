const _ = require('lodash')
const assert = require('assert')

const Repository = require("./user.repository");

module.exports = class UserService {
  repository;

  constructor(db) {
    this.repository = new Repository(db);
  }

  /**
   * Method to create or update a user from user.reference whith full new entity
   * @param {string} userRef
   * @param {object} entity
   * @return {promise<object>} updated entity
   */
  createOrUpdateUser(reference, entity) {
    // assert.ok(reference, '[createOrUpdateUser] Missing reference param')
    assert.ok(entity, '[createOrUpdateUser] Missing entity param')

    let query = { reference };

    if (!query.reference && entity.id) {
      query = { stravaId: entity.id };
    }

    return this.repository.createOrUpdateOne(query, entity);
  }

  /**
   * Method to get user by reference
   * @param {string} reference 
   */
  getUser(reference) {
    assert.ok(reference, '[getUser] Missing reference param')
  
    const displayFields = {
      city: 1,
      country: 1,
      created_at: 1,
      firstname: 1,
      lastname: 1,
      sex: 1,
      height: 1,
      date_of_birth: 1,
      fc_max: 1,
      email: 1
    }

    return this.repository.findOne({reference}, displayFields);
  }

  /**
   * Method to update user with patch
   * @param {string} reference 
   * @param {array} patchs 
   */
  async patchUser(reference, patchs) {
    assert.ok(reference, '[updateUser] Missing reference param')

    if(!patchs.length) {
      throw new Error('[updateUser] parchs param is empty')
    }

    const oldEntity = await this.repository.getFullEntity({reference}) 

    const newEntity = this.repository.applyPatch(oldEntity, patchs)

    return this.repository.createOrUpdateOne({reference}, newEntity);
  }
};
