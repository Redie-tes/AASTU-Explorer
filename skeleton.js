document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const toggleBtn = document.getElementById("darkToggle");
  const cards = document.querySelectorAll(".card");
  const loader = document.querySelector(".loader");
  const container = document.getElementById("cardsContainer");

  let loading = false;

  // =========================
  // DARK MODE
  // =========================
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");

      localStorage.setItem(
        "theme",
        body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  // =========================
  // CARD ANIMATION
  // =========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));

  // =========================
  // INFINITE SCROLL
  // =========================
  function loadMoreCards() {
    if (loading) return;
    loading = true;

    loader.style.display = "block";

    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e">
          <div class="card-content">
            <h3>New Place</h3>
            <p>More amazing destinations to explore.</p>
            <button>Explore</button>
          </div>
        `;

        container.appendChild(card);
        observer.observe(card);
      }

      loader.style.display = "none";
      loading = false;

    }, 1200);
  }

  window.addEventListener("scroll", () => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

    if (nearBottom) {
      loadMoreCards();
    }
  });

});