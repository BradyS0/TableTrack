import {restaurantAPI} from './live/restaurant_api.js'
import {usersAPI} from './live/user_api.js'
import { restaurants } from './mock/mockRestdata.js'


const api = {...usersAPI,...restaurantAPI}
const user =  {first_name: "Test",
    last_name: "User",
    password: "Password123!"
  }

async function populateDB(){
    for (let i=1; i<=restaurants.length; i++){
        let userID = i
        user.email = `testuser${i}@example.com`

        console.log("calling db to create: ", user)

        const res1 = await api.createUser(user.first_name,user.last_name,user.email,user.password)
        console.log(res1)
        if(res1.code<300){
            let rest = restaurants[userID-1]
            console.log("creating restaurant: ", rest.name )
            const res2 = await api.createRestaurant(userID,rest.name,rest.tags, rest.address, `(20${i}) ${i}11-${i}234`)
        }
    }
}

populateDB()

