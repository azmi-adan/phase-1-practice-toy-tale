let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// Fetch Andy's toys when the page loads
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    const toyCollection = document.getElementById('toy-collection');
    toys.forEach(toy => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
      `;
      toyCollection.appendChild(card);
    });
  });

// Add event listener to the "Create Toy" button
document.getElementById('new-toy-btn').addEventListener('click', () => {
  document.querySelector('.container').style.display = 'block';
});

// Add event listener to the "Create Toy" form
document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('input[name="name"]').value;
  const image = document.querySelector('input[name="image"]').value;
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name,
      image,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(toy => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;
    document.getElementById('toy-collection').appendChild(card);
  });
});

// Add event listener to each "Like" button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('like-btn')) {
    const toyId = e.target.id;
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: parseInt(e.target.parentNode.querySelector('p').textContent) + 1
      })
    })
    .then(response => response.json())
    .then(toy => {
      e.target.parentNode.querySelector('p').textContent = `${toy.likes} Likes`;
    });
  }
});
