import cuid from "cuid";

class Collection {
  constructor(db, name) {
    this.name = name;
    this.collection = db.collection(name);
    this.snapshot = [];
  }

  getCollection = async () => {
    const querySnapshot = await this.collection.get();
    const docs = querySnapshot.docs;

    return docs.map(doc => {
      const data = doc.data();
      data.id = doc.id;

      return data;
    });
  };

  getItem = async id => {
    const document = this.collection.doc(id);
    const item = await document.get();

    return item.data();
  };

  // const getRefItem = async (collection, refId) => {
  // do something to get ref item
  // };

  postItem = async data => {
    try {
      const docRef = await this.collection.add(data);
      console.log("Document written with ID: ", docRef.id);

      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  putItem = async (id, data) => {
    await this.collection.doc(id).update(data);
  };

  deleteItem = async id => {
    await this.collection.doc(id).delete();
  };

  userRef = userId => this.collection.where("users", "array-contains", userId);
  user = async userId => await this.userRef(userId).get();

  projectRef = projectId => this.collection.where("projectId", "==", projectId);
  project = async projectId => await this.userRef(projectId).get();
}

export default Collection;
