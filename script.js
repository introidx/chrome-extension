function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
  
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString(undefined, dateOptions);
  }
  
  async function fetchJoke() {
    const urls = [
      'https://official-joke-api.appspot.com/jokes/programming/random',
      'https://official-joke-api.appspot.com/random_joke'
    ];
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
  
    try {
      const response = await fetch(randomUrl);
      const data = await response.json();
      const joke = Array.isArray(data) ? data[0] : data;
      document.getElementById('joke').textContent = `${joke.setup} ${joke.punchline}`;
    } catch (error) {
      document.getElementById('joke').textContent = 'Failed to load joke.';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keydown', handleSearch);
  });
  
  function handleSearch(event) {
    if (event.key === 'Enter') {
      const input = event.target.value.trim();
      if (!input) return;
  
      const urlPattern = /^(https?:\/\/)/i;
      const destination = urlPattern.test(input)
        ? input
        : `https://www.google.com/search?q=${encodeURIComponent(input)}`;
  
      window.location.href = destination;
    }
  }
  
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  }
  
  function applyStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }
  
  applyStoredTheme();
  updateTime();
  fetchJoke();
  setInterval(updateTime, 60000); // Update time every minute
  