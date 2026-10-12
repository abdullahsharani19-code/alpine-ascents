
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => navigation.classList.toggle("active"));
    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navigation.classList.remove("active"));
    });
  }

  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");
  if (form && message) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      message.textContent = "Thanks! Your enquiry has been received.";
      message.style.color = "#bb734a";
      form.reset();
    });
  }

  const items = document.querySelectorAll(".adventure-card,.expedition-card,.journal-card,.safety-card,.timeline-item");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});

  items.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity .7s ease, transform .7s ease";
    observer.observe(item);
  });
    // ===== Visitor counter (dummy, saved in this browser) =====
  const BASE_VISITORS = 1250;
  let visits = 0;
  try {
    visits = parseInt(localStorage.getItem("aaVisits"), 10) || 0;
    visits += 1;
    localStorage.setItem("aaVisits", visits);
  } catch (err) {
    visits = 1;
  }
  const total = (BASE_VISITORS + visits).toLocaleString();
  const visitorCount = document.getElementById("visitorCount");
  const liveVisitors = document.getElementById("liveVisitors");
  if (visitorCount) visitorCount.textContent = total;
  if (liveVisitors) liveVisitors.textContent = total;

  // ===== Live time & date bar =====
  const liveTime = document.getElementById("liveTime");
  const liveDate = document.getElementById("liveDate");
  const liveDay = document.getElementById("liveDay");
  const liveZone = document.getElementById("liveZone");
  const updateClock = () => {
    const now = new Date();
    if (liveTime) liveTime.textContent = now.toLocaleTimeString("en-GB");
    if (liveDate) liveDate.textContent = now.toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"});
    if (liveDay) liveDay.textContent = now.toLocaleDateString("en-US", {weekday: "long"});
    if (liveZone) liveZone.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ");
  };
  updateClock();
  setInterval(updateClock, 1000);
});
