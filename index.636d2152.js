const n=document.querySelector(".search-btn"),e=document.querySelector('[name="searchQuery"]'),a=document.querySelector(".gallery");n.addEventListener("click",(n=>{n.preventDefault();const t=e.value;s(t).then((n=>function(n){a.innerHTML="";const e=n.map((n=>`<div class="photo-card">\n       <a href="${n.largeImageURL}"><img class="photo" src="${n.webformatURL}" alt="${n.tags}" title="${n.tags}" loading="lazy"/></a>\n        <div class="info">\n           <p class="info-item">\n    <b>Likes</b> <span class="info-item-api"> ${n.likes} </span>\n</p>\n            <p class="info-item">\n                <b>Views</b> <span class="info-item-api">${n.views}</span>  \n            </p>\n            <p class="info-item">\n                <b>Comments</b> <span class="info-item-api">${n.comments}</span>  \n            </p>\n            <p class="info-item">\n                <b>Downloads</b> <span class="info-item-api">${n.downloads}</span> \n            </p>\n        </div>\n    </div>`)).join("");a.insertAdjacentHTML("beforeend",e)}(n.hits)))}));const s=async n=>{const e=`https://pixabay.com/api/?key=32144647-959c857bfd1217eb2ae7a3cc9&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`;return await fetch(e).then((async n=>{if(!n.ok){if(404===n.status)return[];throw new Error(n.status)}return await n.json()})).catch((n=>{console.log(n)}))};
//# sourceMappingURL=index.636d2152.js.map
