export const createPost = (uid, userName,userPhoto, contentText, privacy) => {
  return firebase.firestore().collection('posts').add({
    userId: uid,
    user: userName,
    userPhoto: userPhoto,
    content: contentText,
    likes: 0,
    date: new Date(),
    state: privacy
  })
} 
export const getAllPosts = (callback) => {
    firebase.firestore().collection('posts')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
        });
        callback(data);
      }); 
    }

export const getPublicPosts = (callback) => {
    firebase.firestore().collection('posts').where("state", "==", "public")
    .get()
    .then(function(querySnapshot) {
        let data = [];
        querySnapshot.forEach(function(doc) {
            data.push({ id: doc.id, ...doc.data() })
        });
        callback(data);
    })
}

export const updatePost = (idPost, content, privacy) => { 
    let refPost = firebase.firestore().collection('posts').doc(idPost);
    return refPost.update({
    content: content,
    state: privacy
    });
}


export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();