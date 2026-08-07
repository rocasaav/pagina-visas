let reviews = [];
let currentIndex = 0;

async function loadReviews() {
  try {
    const response = await fetch("https://avisas.com.mx/reviews");
    reviews = await response.json();
    renderReviews();
  } catch (error) {
    console.error("Error cargando reseñas:", error);
  }
}

function renderReviews() {
  const container = document.getElementById("reviews-container");
  container.innerHTML = "";

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  visibleReviews.forEach(r => {
    const card = `
      <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-yellow-500 text-lg">★</span>
          <span class="font-bold text-slate-700">${r.rating}</span>
        </div>
        <p class="text-slate-800 font-semibold mb-3">"${r.text}"</p>
        <p class="text-sm text-slate-500">${r.author_name}</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentIndex + 3 < reviews.length) {
    currentIndex += 3;
    renderReviews();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex - 3 >= 0) {
    currentIndex -= 3;
    renderReviews();
  }
});

loadReviews();