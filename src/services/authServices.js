// src/services/authService.js
const authService = {
  login(email, password) {
    // In a real app, this would make an API call
    const token = 'demo-token-' + Math.random().toString(36).substring(2);
    const user = { username: 'DemoUser', email };
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  },

  register(username, email, password) {
    // In a real app, this would make an API call
    return { success: true };
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

export default authService;
