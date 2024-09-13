const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

async function deleteDoneItems() {
  try {
    const doneItemsQuery = db.collection('shoppinglist').where('status', '==', true);
    const querySnapshot = await doneItemsQuery.get();

    if (querySnapshot.empty) {
      console.log('No done items to delete');
      return;
    }

    const batch = db.batch();

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('Done items successfully deleted');
  } catch (error) {
    console.error('Error deleting done items:', error);
  }
}

module.exports = { deleteDoneItems };
