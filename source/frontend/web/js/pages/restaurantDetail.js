import { api } from "../global.js"
import { loadPublicMenu } from './menu.js';
import { createScheduleCard} from "../components/schedule.js";
import { goToReservation } from "../components/nav.js";
import { generateTemplate } from "../utils.js";

const DEFAULT_LOGO = "https://media.istockphoto.com/id/1038356020/vector/restaurant-icon.jpg?s=612x612&w=0&k=20&c=Tk_v3JuJA4lz_8ZRJi78xS4p75Idqt97uEtYJciVtFI=";

if (window.location.pathname.toLowerCase().includes("restaurantdetail")){
document.addEventListener("DOMContentLoaded", async()=>{
     const params = new URLSearchParams(window.location.search);
     await loadRestaurant(params.get('restID'))
     await loadPublicMenu(params.get('restID'));
    })
}

export async function loadRestaurant(restID){
    const app = document.getElementById('app')
    const response = await api.getRestaurantByID(restID)

    console.log(response)

    if (response.code==200){
      const rest = response.data
      app.append(await createRestaurantInfo(rest));
      console.log("populated the restaurant")
    }else{
      app.append(await createRestaurantInfo({}));
    }
}

async function createRestaurantInfo({ restID, name, logo,tags=["no-tag-found"], rating, address, hours, phone}) {
  // setup page title
  document.querySelector('title').innerText = `TableTrack | ${name ? name : '404'}`

  const tags_html = tags.map(tag => `<p>${tag}</p>`).join('') || "<p> no tags found</p>";
  const container = generateTemplate(`<div id="restaurant-info">
    <span id="restaurant-name">
    <img src="${logo || DEFAULT_LOGO}"/>
    <h1>${name || "No name found"} </h1>
    </span>
    <span class="tags">
      ${tags_html}
    </span>
    </div>`)

  // --- Detail Section ---
  const detailSection = createDetailSection({restID,name,address,rating,hours,phone})
  container.append(detailSection)

  // --- weekly schedule ----
  const schedule_req = await api.getFullSchedule(restID)
  if (schedule_req.code<300){
    const weeklySchedule = createScheduleCard(schedule_req.schedule)
    container.append(weeklySchedule)
  }    
  
  const hr_break = document.createElement('hr')
  // --- Content Section ---
  const contentSection = generateTemplate(`<section id="restaurant-content"/>`)

  // --- populate  ----
  container.append(hr_break,contentSection)

  return container;
}


function createDetailSection({restID,rating,hours,address,phone}){
  const detailSection = generateTemplate(`<section class="detail-header">
    <div>
    <p class="rating">⭐ ${rating || "NaN"}</p> 
    <p id="restaurant-location">Location: <span>${address || "404 Lost street, Nowhere, Never Land"}</span></p>
    <p id="restaurant-hours">Hours: ${hours || "13pm-14pm"}</p>
    <p id="restaurant-phone">Phone: <span>${phone || "204 - 111 - 1111"}</span></p>
    </div>
    </section>`)
    
    // --- Reservation Button ---
    const reservationBtn = createReservationButton(restID)
    detailSection.append(reservationBtn)

  return detailSection;
}

function createReservationButton(restID){
  const reservationBtn = generateTemplate(`<button class="btn reservation-btn">Make Reservation</button>`)

  reservationBtn.addEventListener("click",()=>{
    goToReservation(restID)
  })

  return reservationBtn;
}