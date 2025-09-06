export const mockDB = {
  users: new Map(),

  save() {
    const json = JSON.stringify(Object.fromEntries(this.users));
    localStorage.setItem('mockDB', json);
  },
 load() {
    const raw = localStorage.getItem('mockDB');
    if (raw) {
      const parsed = JSON.parse(raw);
      this.users = new Map(Object.entries(parsed));
    }
  },

  getUser(email) {
    return this.users.get(email);
  }
};
mockDB.load();