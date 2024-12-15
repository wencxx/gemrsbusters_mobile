import { defineStore } from 'pinia'
import { db } from '../config/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const useDataStore = defineStore('dataStore', {
     state: () => ({
        services: [],
        fetchingServices: false
     }),
     actions: {
        async getServices(){
            this.services = []
            const servicesRef = collection(db, 'services')
            try {
                this.fetchingServices = true
                const snapshots = await getDocs(servicesRef)

                snapshots.docs.forEach(doc => {
                    this.services.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            } catch (error) {
                console.log(error)
            } finally {
                this.fetchingServices = false
            }
        },
        getSingleService(serviceId){
            return this.services.find(service => service.id === serviceId)
        }
     }
})

export default useDataStore