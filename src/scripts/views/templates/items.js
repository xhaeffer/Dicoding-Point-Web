const favoriteButtonTemplate = () => `
  <button
    aria-label="add restaurant to favorite"
    id="favButton"
    class="fav-button"
    style="border:none; font-size: 30px; background-color: transparent; cursor: pointer;"
  >
    <i class="fa-regular fa-heart" style="color: #ff496c;" aria-hidden="true"></i>
  </button>
`;

const favoritedButtonTemplate = () => `
  <button
    aria-label="remove restaurant from favorite"
    id="favButton"
    class="fav-button"
    style="border:none; font-size: 30px; background-color: transparent; cursor: pointer;"
  >
    <i class="fa-solid fa-heart" style="color: #ff496c; aria-hidden="true""></i>
  </button>
`;

const errorTemplate = (message) => {
  if (message) {
    return `
      <div class="error-msg">
        <h1>Maaf, terjadi kesalahan</h1>
        <p>Coba periksa lagi nanti</p>
        <br>
        <p style="font-size:12px;">${message}</p>
      </div>
  `;
  }

  return `
    <div class="error-message">
      <h1>Maaf, terjadi kesalahan</h1>
      <p>Coba periksa lagi nanti</p>
    </div>
  `;
};

const offlineTemplate = () => `
  <div class="offline-msg">
    <h1>Anda sedang offline</h1>
    <p>Cek koneksi internet Anda</p>
  </div>
`;

const noDataTemplate = () => `
  <div class="no-data-msg">
    <h1>Daftar kosong</h1>
    <p>Tidak ada data yang dapat ditampilkan</p>
  </div>
`;

export {
  favoriteButtonTemplate,
  favoritedButtonTemplate,
  errorTemplate,
  offlineTemplate,
  noDataTemplate,
};
