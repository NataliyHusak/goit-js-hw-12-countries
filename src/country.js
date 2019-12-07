import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';

const input = document.querySelector('.input');
const ul = document.querySelector('.country');

input.addEventListener(
  'input',
  debounce(e => {
    fetchCountries(e.target.value)
      .then(data => {
        if (data.length <= 10 && data.length >=2 ) {
          PNotify.error({
            text: 'Too much matches found. Please enter a more specific query!',
            delay: 1000,
            icon: true,
          });
          return data.reduce((acc, counrty) => {
            acc += `<li>${counrty.name}</li>`;
            return (ul.innerHTML = acc);
          }, '');
        }
        if (data.length === 1) {
          return data.reduce((acc, counrty) => {
            console.log('counrty', counrty);
            acc += `<h2 class="country__title">${counrty.name}</h2>
            <div class="country__wrapper">

            <div>
          <p><span style="font-weight: bold">Capital: </span>${
            counrty.capital
          }</p>
          <p><span style="font-weight: bold">Population: </span>${
            counrty.population
          } citizens</p>
          <p><span style="font-weight: bold">Languages: </span>


          <ul>
          ${counrty.languages.reduce((acc, cur) => {
            return (acc += `<li>${cur.name}</li>`);
          }, '')}
          </ul></p>
          </div>
          <div><img src="${
            counrty.flag
          }" width="600" height="400" alt="Flag"></div>`;

            return (ul.innerHTML = acc);
          }, '');
        } else {
          return '';
        }
      })
      .catch(error => console.warn(error));
  }, 500),
);

// input.addEventListener(
//   'input',
//   debounce(e => {
//     fetchCountries(e.target.value)
//       .then(data => {
//         if (data.length <= 10 && data.length !== 1) {
//           PNotify.error({
//             text: 'Too much matches found. Please enter a more specific query!',
//             addClass: 'custom nonblock',
//             delay: 2000,
//             icon: true,
//           });
//           return data.reduce((acc, counrty) => {
//             acc += `<li>${counrty.name}</li>`;
//             return (ul.innerHTML = acc);
//           }, '');
//         }
//         if (data.length === 1) {
//           return data.reduce((acc, counrty) => {
//             console.log('counrty', counrty);
//             acc += `<h2 class="country__title">${counrty.name}</h2>
//             <div class="country__wrapper">

//             <div>
//           <p><span style="font-weight: bold">Capital: </span>${
//             counrty.capital
//           }</p>
//           <p><span style="font-weight: bold">Population: </span>${
//             counrty.population
//           } citizens</p>
//           <p><span style="font-weight: bold">Languages: </span>

//           <ul>
//           ${counrty.languages.reduce((acc, cur) => {
//             return (acc += `<li>${cur.name}</li>`);
//           }, '')}
//           </ul></p>
//           </div>
//           <div><img src="${
//             counrty.flag
//           }" width="600" height="400" alt="Flag"></div>`;

//             return (ul.innerHTML = acc);
//           }, '');
//         } else {
//           return '';
//         }
//       })
//       .catch(err => console.log(err));
//   }, 500),
// );
