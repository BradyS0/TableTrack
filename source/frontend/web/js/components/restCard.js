const tempImagesrc = "https://media.istockphoto.com/id/1038356020/vector/restaurant-icon.jpg?s=612x612&w=0&k=20&c=Tk_v3JuJA4lz_8ZRJi78xS4p75Idqt97uEtYJciVtFI=" 
const timeImage = "../assets/time.svg"
export function createCard({ restId, name, logo, tags, hours, rating }) {
  const card = document.createElement('div');
  card.classList.add('restCard');
  const tagsHTML = tags.map(tag => `<p>${tag}</p>`).join('');

  card.innerHTML = `
    <div class="cardHeader"> <h3>${name}</h3> <image src="${logo || tempImagesrc }" class="restLogo"></image></div>
    <span class="tags">${tagsHTML}</span>
    <span class="restTime"> <image src="${timeImage}"/> ${hours || ''}</span>
    ${rating ? `<span class="rating">★ ${rating}</span>` : ''}
  `;

  card.addEventListener('click', () => {
    window.location.href = `./restaurantDetail.html?restId=${restId}`;
  })

  return card;
}

