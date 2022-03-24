
 import firebase from './firebase-config'
 
 export const githubProvider=new firebase.auth.GithubAuthProvider()
 const githubAuth =()=>{ 
   return   firebase.auth().signInWithPopup(githubProvider).then((res)=>{
       
      console.log("user",res)
         return res.user;
     }).catch((er)=>{
         return er
          
     })


}
export default githubAuth;