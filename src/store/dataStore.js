import { defineStore } from 'pinia'
import { db } from '../config/firebaseConfig'
import { collection, getDocs, where, query, and } from 'firebase/firestore'

const useDataStore = defineStore('dataStore', {
     state: () => ({
        services: [],
        fetchingServices: false,
        employee: []
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
        },
        async getEmployee(){
            try {
                const q = query(
                    collection(db, 'users'),
                    and(
                        where('isAccepted', '==', true),
                        where('role', '==', 'employee'),
                    )
                )

                const snapshots = await getDocs(q)

                snapshots.docs.forEach(doc => {
                    this.employee.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            } catch (error) {
                console.log(error)
            } 
        },
        getEmployeeDetails(employeeID){
            return this.employee.find(employee => employee.id === employeeID)
        },
     }
})

export default useDataStore