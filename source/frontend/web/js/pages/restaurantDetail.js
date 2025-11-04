import { api } from "../global.js"
import { createScheduleCard, schedule } from "../components/schedule.js";


if (window.location.pathname.includes("restaurantDetail")){
document.addEventListener("DOMContentLoaded", ()=>{
     const params = new URLSearchParams(window.location.search);
     loadRestaurant(params.get('restID'))
    })
}

export async function loadRestaurant(restID){
    const app = document.getElementById('app')
    const response = await api.getRestaurantByID(restID)

    console.log(response)

    if (response.code==200){
      const rest = response.data
      app.append(createRestaurantInfo(rest));
      console.log("populated the restaurant")
    }else{
      app.append(createRestaurantInfo({}));
    }
}

function createRestaurantInfo({ restID, name, logo,tags=["no-tag-found"], rating, address, hours, phone}) {
  // Create main container
  const hr_break = document.createElement('hr')
  const container = document.createElement('div');
  container.id = 'restaurant-info';

  // --- Header (name + image) ---
  const nameHeader = document.createElement('span');
  nameHeader.id = 'restaurant-name';

  const img = document.createElement('img');
  img.src = logo || "https://media.istockphoto.com/id/1038356020/vector/restaurant-icon.jpg?s=612x612&w=0&k=20&c=Tk_v3JuJA4lz_8ZRJi78xS4p75Idqt97uEtYJciVtFI=";

  nameHeader.appendChild(img);
  nameHeader.innerHTML = nameHeader.innerHTML + `<h1>${name || "No name found"} </h1>`; 
  
  const tagsSpan = document.createElement("span")
  tagsSpan.classList.add('tags')
  tagsSpan.innerHTML = tags.map(tag => `<p>${tag}</p>`).join('') || "<p> no tags found</p>";

  // --- Detail Section ---
  const detailSection = createDetailSection({restID,name,address,rating,hours,phone})

  // --- Content Section ---
  const contentSection = document.createElement('section');
  contentSection.id = 'restaurant-content';

  const comingSoon = document.createElement('h2');
  comingSoon.textContent = 'Menu coming soon';

  contentSection.appendChild(comingSoon);

  // --- weekly schedule ----
  const weeklySchedule = createScheduleCard(schedule)

  // --- Combine All ---
  container.append(nameHeader, tagsSpan, detailSection, weeklySchedule, hr_break,contentSection);

  return container;
}

function createDetailSection({restID,rating,hours,address,phone}){
  const detailSection = document.createElement('section');
  detailSection.className = 'detail-header';

  const detailsDiv = document.createElement('div');

  const ratingP = document.createElement('p');
  ratingP.className = 'rating';
  ratingP.textContent = `⭐ ${rating || "NaN"}`;

  const locationP = document.createElement('p');
  locationP.id = 'restaurant-location';
  locationP.innerHTML = `Location: <span>${address || "404 Lost street, Nowhere, Never Land"}</span>`;

  const hoursP = document.createElement('p');
  hoursP.id = 'restaurant-hours';
  hoursP.textContent = `Hours: ${hours || "13pm-14pm"}`;

  const phoneNumP = document.createElement('p');
  phoneNumP.id = 'restaurant-phone';
  phoneNumP.innerHTML = `Phone: <span>${phone || "204 - 111 - 1111"}</span>`;

  detailsDiv.append(ratingP, locationP, phoneNumP);

  // --- Reservation Button ---
  const reservationBtn = createReservationButton(restID)

  detailSection.append(detailsDiv, reservationBtn);

  return detailSection;
}

function createReservationButton(restID){
  const reservationBtn = document.createElement('button');
  reservationBtn.className = 'btn reservation-btn';
  reservationBtn.textContent = 'Make Reservation';
  
  reservationBtn.addEventListener("click",()=>{
    alert("feature coming soon!")
    restID //use this to make a call to reservation logic
  })

  return reservationBtn;
}