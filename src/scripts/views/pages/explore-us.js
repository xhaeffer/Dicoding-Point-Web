const ExploreUs = {
  async render() {
    return `
      <h1>Lets Explore!</h1>
      <restaurants-list></restaurants-list>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default ExploreUs;
