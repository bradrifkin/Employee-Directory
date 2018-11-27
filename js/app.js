const card = document.querySelectorAll('.card');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
           .then(checkStatus)  
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
}

Promise.all([
  fetchData('https://randomuser.me/api/?results=12')  
])
.then(data => {
  let randomImages = [];
  for (let i = 0; i < 12; i++) {
  	randomImages[i] = data[0].results[i].picture.large;
  }

  let randomNames = [];
  for (let i = 0; i < 12; i++) {
  	randomNames[i] = capitalize(data[0].results[i].name.first + " " + data[0].results[i].name.last);
  }

  let randomEmails = [];
  for (let i = 0; i < 12; i++) {
  	randomEmails[i] = data[0].results[i].email;
  }

  let randomCities = [];
  for (let i = 0; i < 12; i++) {
  	randomCities[i] = capitalize(data[0].results[i].location.city);
  }

  for (let i = 0; i < card.length; i++) {
  	let randomImage = randomImages[i];
  	let randomName = randomNames[i];
  	let randomEmail = randomEmails[i];
  	let randomCity = randomCities[i];

  	const html = `
	    <img src='${randomImage}' alt>
	    <div class='contact-info'>
	    	<h2 class='name'>${randomName}</h2>
			<p class='email'>${randomEmail}</p>
			<p class='city'>${randomCity}</p>
		</div>
  	`;

  	card[i].innerHTML = html;
  }

  console.log(data[0]);

})

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function fetchBreedImage() {
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = `Click to view more ${breed}s`;
    })
}

function capitalize(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// card.addEventListener('click', fetchBreedImage);



// $.ajax({
//   url: 'https://randomuser.me/api/?results=12',
//   dataType: 'json',
//   success: function(data) {
//     console.log(data);
//   }
// });