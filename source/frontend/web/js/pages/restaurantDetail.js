import { restById } from '../tempRestdata.js'; 

document.addEventListener("DOMContentLoaded",()=>{
    const app = document.getElementById('app')
    const params = new URLSearchParams(window.location.search);
    const rest = restById(params.get('restId')) || {}
    app.append(createRestaurantInfo(rest));
    console.log("populated the restaurant")
    
})

function createRestaurantInfo({ restId, name, logo,tags=["no-tag-found"], rating, location, hours}) {
  // Create main container
  const hr_break = document.createElement('hr')
  const container = document.createElement('div');
  container.id = 'restaurant-info';

  // --- Header (name + image) ---
  const nameHeader = document.createElement('span');
  nameHeader.id = 'restaurant-name';

  const img = document.createElement('img');
  img.src = "https://media.istockphoto.com/id/1038356020/vector/restaurant-icon.jpg?s=612x612&w=0&k=20&c=Tk_v3JuJA4lz_8ZRJi78xS4p75Idqt97uEtYJciVtFI=";

  nameHeader.appendChild(img);
  nameHeader.innerHTML = nameHeader.innerHTML + `<h1>${name || "No name found"} </h1>`; 
  
  const tagsSpan = document.createElement("span")
  tagsSpan.classList.add('tags')
  tagsSpan.innerHTML = tags.map(tag => `<p>${tag}</p>`).join('') || "<p> no tags found</p>";

  // --- Detail Section ---
  const detailSection = createDetailSection({restId,name,location,rating,hours})

  // --- Content Section ---
  const contentSection = document.createElement('section');
  contentSection.id = 'restaurant-content';

  const comingSoon = document.createElement('h2');
  comingSoon.textContent = 'Menu coming soon';

  contentSection.appendChild(comingSoon);

  // --- Combine All ---
  container.append(nameHeader, tagsSpan, detailSection, hr_break,contentSection);

  return container;
}

function createDetailSection({restId,rating,hours,location}){
  const detailSection = document.createElement('section');
  detailSection.className = 'detail-header';

  const detailsDiv = document.createElement('div');

  const ratingP = document.createElement('p');
  ratingP.className = 'rating';
  ratingP.textContent = `⭐ ${rating || "NaN"}`;

  const locationP = document.createElement('p');
  locationP.id = 'restaurant-location';
  locationP.innerHTML = `Location: <span>${location || "lost street, Nowhere, Never Land"}</span>`;

  const hoursP = document.createElement('p');
  hoursP.id = 'restaurant-hours';
  hoursP.textContent = `Hours: ${hours || "13pm-14pm"}`;

  detailsDiv.append(ratingP, locationP, hoursP);

  // --- Reservation Button ---
  const reservationBtn = createReservationButton(restId)

  detailSection.append(detailsDiv, reservationBtn);

  return detailSection;
}

function createReservationButton(restId){
  const reservationBtn = document.createElement('button');
  reservationBtn.className = 'btn reservation-btn';
  reservationBtn.textContent = 'Make Reservation';
  
  reservationBtn.addEventListener("click",()=>{
    alert("feature coming soon!")
  })

  return reservationBtn;
}