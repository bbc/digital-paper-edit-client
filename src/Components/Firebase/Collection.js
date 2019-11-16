import admin from './admin';
import cuid from 'cuid';
const db = admin.firestore();

const getCollection = async collection => {
  const query = db.collection(collection);
  const querySnapshot = await query.get();
  const docs = querySnapshot.docs;

  return docs.map(doc => {
    const data = doc.data();
    data.id = doc.id;

    return data;
  });
};

const getItem = async (collection, id) => {
  const document = db.collection(collection).doc(id);
  const item = await document.get();

  return item.data();
};

const getRefItem = async (collection, refId) => {
  // do something to get ref item
};

const postItem = async (collection, data) => {
  await db
    .collection(collection)
    .doc('/' + cuid() + '/')
    .create(data);
};

const putItem = async (collection, id, data) => {
  await db
    .collection(collection)
    .doc(id)
    .update(data);
};

const deleteItem = async (collection, id) => {
  await db
    .collection(collection)
    .doc(id)
    .delete();
};

class Collection {
  constructor(name) {
    this.name = name;
  }
  deleteItem = id => deleteItem(this.name, id);
  getCollection = () => getCollection(this.name);
  getItem = id => getItem(this.name, id);
  postItem = data => postItem(this.name, data);
  putItem = (id, data) => putItem(this.name, id, data);
}

export default Collection;

// module.exports = {
// db,
// getCollection,
// getItem,
// postItem,
// putItem,
// deleteItem
// };
