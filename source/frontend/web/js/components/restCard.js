export function createCard({ name, hours, rating }) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h3>${name || 'Placeholder'}</h3>
    <p>${hours || ''}</p>
    ${rating ? `<span class="rating">★ ${rating}</span>` : ''}
  `;
  return card;
}