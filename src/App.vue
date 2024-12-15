<template>
  <div class="font-inter">
    <router-view />
  </div>
</template>

<script setup>
import { auth, db } from './config/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'
import { useAuthStore, useDataStore } from './store'

const authStore = useAuthStore()
const dataStore = useDataStore()

const userRef = collection(db, 'users')

onAuthStateChanged(auth,async (user) => {
  if(user){
    const docRef = query(
        userRef,
        where('userID', '==', user.uid),
        limit(1)
    )

      const snapshot = await getDocs(docRef)
      if(snapshot.docs[0].data().role !== 'client') return authStore.logout()

      const userData = {
          ...user,
          ...snapshot.docs[0].data()
      }

    authStore.user = userData
    dataStore.getServices()
  }else{
    authStore.logout()
  }
})
</script>