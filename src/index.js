import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix';

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('[name="searchQuery"]');
const galleryField = document.querySelector('.gallery');

const API_KEY = '32144647-959c857bfd1217eb2ae7a3cc9';

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  getImagesAxios({ query: searchInput.value });
});

async function getImagesAxios({ query }) {
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  try {
    const resAxios = await axios.get(urlAPI).then(res => res.data.hits);
    if (resAxios.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
      return;
    }
    renderImageList(resAxios);
    onSimpleLightBox();
  } catch (error) {
    console.log(error);
  }
}

function renderImageList(images) {
  galleryField.innerHTML = '';
  const imagesList = images
    .map(image => {
      return `<div class="photo-card">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  galleryField.insertAdjacentHTML('beforeend', imagesList);
}

function onSimpleLightBox() {
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
