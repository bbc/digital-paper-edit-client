/* eslint-disable class-methods-use-this */
class DBWrapper {
  constructor() {
    this.diskdb = {};
    // TODO: move to user data folder, so that is in the system but not inside the app
    // easier to persist data between upgrades of the app
    // const pathToDiskDb = `${ app.getAppPath() }/src/ElectronWrapper/db`;
    // const pathToDiskDb =  `${app.getPath("userData")}/db`;
    // this.diskdb = diskdb.connect(pathToDiskDb, [ 'projects', 'transcripts', 'annotations', 'labels', 'paperedits' ]);
  }

  getAll(model, id) {
    const response = await fetch(`${model}.json`);
    const data = await response.json();

    if (id) {
      return this.diskdb[model].find({ ...id });
    }

    return model;
  }

  get(model, id) {
    return this.diskdb[model].findOne({ ...id });
  }

  create(model, data) {
    return this.diskdb[model].save(data);
  }

  update(model, id, data) {
    return this.diskdb[model].update({ ...id }, { ...data }, {
      multi: false, // update multiple - default false
      upsert: false, // if object is not found, add it (update-insert) - default false
    });
  }

  delete(model, id) {
    // remove only the first match
    return this.diskdb[model].remove({ ...id }, false);
  }
}
const db = new DBWrapper();
Object.freeze(db);
module.exports = db;
