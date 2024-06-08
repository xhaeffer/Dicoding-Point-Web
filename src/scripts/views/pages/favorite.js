const Favorite = {
  async render() {
    return `
      <h1>Your Favorite</h1>
      <restaurants-list data-source="favorite"></restaurants-list>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default Favorite;
