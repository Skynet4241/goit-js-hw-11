import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix';

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('[name="searchQuery"]');
const galleryField = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const API_KEY = '32144647-959c857bfd1217eb2ae7a3cc9';
let currentPage = 1;
const pageSize = 40;
let totalPages = undefined;

btnLoadMore.style.display = 'none';

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  galleryField.innerHTML = '';
  getImagesAxios({ query: searchInput.value }, currentPage);
});

async function getImagesAxios({ query }) {
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${pageSize}`;
  try {
    if (query !== '') {
      return await axios.get(urlAPI).then(res => {
        if (res.data.hits.length === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again'
          );
        } else {
          renderImageList(res.data.hits);

          Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
          btnLoadMore.style.display = 'block';
          simpleLightBox.refresh();
          calculatePagination(res.data.totalHits);
          return res.data.hits;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function renderImageList(images) {
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

// function onSimpleLightBox() {
//   new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
// }

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

function calculatePagination(totalHits) {
  totalPages = Math.ceil(totalHits / pageSize);
  if (totalPages <= 1) {
    btnLoadMore.style.display = 'none';
  }

  //   console.log(totalPages);
}

btnLoadMore.addEventListener('click', () => {
  currentPage += 1;
  //   btnLoadMore.style.display = 'none';

  getImagesAxios({ query: searchInput.value }).then(response => {
    renderImageList(response);
  });
});
