const shortid = require('shortid');
const _ = require('lodash')
const jsonPatch = require('fast-json-patch');

const BaseRepository = require("../../common/base-repository");

module.exports = class UserRepository extends (
  BaseRepository
) {
  dbCollection;
  constructor(db) {
    super();
    this.dbCollection = db.collection("user");
  }

  /**
   * Method to create or update a user
   * @param {object} query 
   * @param {object} newEntity 
   * @return {promise<object>} updated entity
   */
  async createOrUpdateOne(query, newEntity) {
    const projection = {firstname: true, lastname: true};

    if (!query) return;

    try {
      const oldEntity = await this.getFullEntity(query);
      const formatedEntity = this.formatEntity(oldEntity || newEntity);

      if (oldEntity && oldEntity.reference && formatedEntity) {
        const patch = jsonPatch.compare(oldEntity || {}, formatedEntity)
        const patchedEntity = this.applyPatch(oldEntity, patch)

        await this.dbCollection.findOneAndReplace({ reference: oldEntity.reference }, patchedEntity )
      } else {
        // if it's not updated this is a new entity, so we format and create it in db
        await this.dbCollection.insertOne(formatedEntity)
      }

      return this.findOne({reference: formatedEntity.reference}, projection);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Method to apply patch on entity
   * @param {object} oldEntity 
   * @param {array} patch 
   * @return {object} newEntity
   */
  applyPatch(oldEntity, patch) {
    return jsonPatch.applyPatch(oldEntity, patch).newDocument
  }

  /**
   * Method to get the full entity
   * !! NOT USE IT TO RETURN DATAS
   * @param {object} query 
   */
  getFullEntity(query) {
    return this.dbCollection.findOne({active: true, ...query}, {projection: {_id: 0}});
  }

    /**
   * Method to create or update a user from user.reference
   * @param {object} query
   * @param {object} projection
   * @return {promise<object>} entity
   */
  findOne(query, projection = {}) {
    if (!query) return;
    
    return this.dbCollection.findOne({ active: true, ...query }, {projection: {_id: 0, reference: 1, ...projection}})
  }

  /**
   * Method to format User entity
   * @param {object} entity 
   * @returns {object} formated entity
   */
  formatEntity(entity) {
    const {stravaId} = entity;
    const formatedEntity = _.cloneDeep(entity);

    _.unset(formatedEntity, 'id')
    _.unset(formatedEntity, 'strava_access_token');
    _.unset(formatedEntity, 'strava_refresh_token');
    _.unset(formatedEntity, 'badge_type_id');
    _.unset(formatedEntity, 'premium');
    _.unset(formatedEntity, 'updated_at')
    _.unset(formatedEntity, 'summit')
    _.unset(formatedEntity, 'state')
    _.unset(formatedEntity, 'follower')
    _.unset(formatedEntity, 'friend')
    _.unset(formatedEntity, 'resource_state')    

    _.set(formatedEntity, 'stravaId', entity.id || stravaId);
    _.set(formatedEntity, 'active', true);

    if (formatedEntity.date_of_birth) {
      const birthday = new Date(Date.parse(formatedEntity.date_of_birth).toISOString());
      _.set(formatedEntity, 'date_of_birth', birthday);
    }

    // if reference entity already exist
    if (!formatedEntity.reference) {
      _.set(formatedEntity, 'created_at', new Date(Date.now()).toISOString());
      _.set(formatedEntity, 'reference', shortid.generate());
    } else {
      _.set(formatedEntity, 'updated_at', new Date(Date.now()).toISOString());
    }

    return formatedEntity
  }
};
