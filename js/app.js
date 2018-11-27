const card = document.querySelectorAll('.card');
const modal = document.querySelectorAll('.modal');
const main = document.querySelector('main');
const cancel = document.querySelectorAll('.cancel');

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

  let randomPhones = [];
  for (let i = 0; i < 12; i++) {
  	randomPhones[i] = data[0].results[i].cell;
  }

  let randomAddresses = [];
  for (let i = 0; i < 12; i++) {
  	randomAddresses[i] = capitalize(data[0].results[i].location.street + ", " + data[0].results[i].location.city + ", " + data[0].results[i].location.state + " " + data[0].results[i].location.postcode)
  }

  let randomBirthdays = [];
  let randomBirthdayMonths = [];
  let randomBirthdayDays = [];
  let randomBirthdayYears = [];
  for (let i = 0; i < 12; i++) {
  	randomBirthdayMonths[i] = data[0].results[i].dob.date.substring(5,7);
  	randomBirthdayDays[i] = data[0].results[i].dob.date.substring(8,10);
  	randomBirthdayYears[i] = data[0].results[i].dob.date.substring(2,4);
  	randomBirthdays[i] = 'Birthday: ' + randomBirthdayMonths[i] + "/" + randomBirthdayDays[i] + "/" + randomBirthdayYears[i];
  }

  for (let i = 0; i < card.length; i++) {
  	let randomImage = randomImages[i];
  	let randomName = randomNames[i];
  	let randomEmail = randomEmails[i];
  	let randomCity = randomCities[i];
  	let randomPhone = randomPhones[i];
  	let randomAddress = randomAddresses[i];
  	let randomBirthday = randomBirthdays[i];

  	const htmlCard = `
	    <img src='${randomImage}' alt>
	    <div class='contact-info'>
	    	<h2 class='name'>${randomName}</h2>
			<p class='email'>${randomEmail}</p>
			<p class='city'>${randomCity}</p>
		</div>
  	`;

  	const htmlModal = `
  		<a href='#' class='cancel'>x</a>
	    <img src='${randomImage}' alt>
	    <div class='contact-info'>
	    	<h2 class='name'>${randomName}</h2>
			<p class='email'>${randomEmail}</p>
			<p class='city'>${randomCity}</p>
		</div>
		<div class="additional-info">
			<p class='phone'>${randomPhone}</p>
			<p class='address'>${randomAddress}</p>
			<p class='birthday'>${randomBirthday}</p>
		</div>
  	`;

  	card[i].innerHTML = htmlCard;
  	modal[i].innerHTML = htmlModal;
  }

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

for (let i = 0; i < card.length; i++) {
    (function(index){
        main.children[i].onclick = function(){
            main.style.opacity = '.3';
            main.style.pointerEvents = 'none';
            modal[index].style.display = 'block';
        }    
    })(i);
}

for (let i = 0; i < card.length; i++) {
    (function(index){
        modal[i].onclick = function(){
            main.style.opacity = '1';
            main.style.pointerEvents = 'auto';
            modal[index].style.display = 'none';
        }    
    })(i);
}