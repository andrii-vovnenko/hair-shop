export const mockDB = {
  users: new Map(),

  save() {
    const json = JSON.stringify(Object.fromEntries(this.users));
    localStorage.setItem('mockUsers', json);
  },

  load() {
    const raw = localStorage.getItem('mockUsers');
    if (raw) {
      const parsed = JSON.parse(raw);
      this.users = new Map(Object.entries(parsed));
    }
  }
};
