(function () {
  const nav = document.querySelector(".main-nav");
  const menuBtn = document.querySelector(".menu-btn");
  const page = document.body.dataset.page;

  if (nav && page) {
    const active = nav.querySelector(`[data-nav="${page}"]`);
    if (active) active.classList.add("active");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  const form = document.getElementById("customForm");
  if (!form) return;

  const summaryList = document.getElementById("summaryList");
  const priceEstimate = document.getElementById("priceEstimate");

  const formatCop = function (value) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const updateSummary = function () {
    const data = new FormData(form);
    const sizeOption = form.querySelector("select[name='tamano'] option:checked");
    const basePrice = Number(sizeOption?.dataset.price || 100000);
    const extras = data.getAll("extras");
    const total = basePrice + extras.length * 12000;

    const rows = [
      `Diseño: ${data.get("nombre") || "-"}`,
      `Tamaño: ${data.get("tamano") || "-"}`,
      `Colores: ${data.get("colores") || "-"}`,
      `Estilo: ${data.get("estilo") || "-"}`,
      `Extras: ${extras.length ? extras.join(", ") : "Sin extras"}`,
    ];

    summaryList.innerHTML = rows.map((item) => `<li>${item}</li>`).join("");
    priceEstimate.textContent = `${formatCop(total)} COP`;
  };

  form.addEventListener("input", updateSummary);
  updateSummary();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(form);
    const sizeOption = form.querySelector("select[name='tamano'] option:checked");
    const basePrice = Number(sizeOption?.dataset.price || 100000);
    const extras = data.getAll("extras");
    const total = basePrice + extras.length * 12000;

    const message = [
      "Hola Plopii, quiero cotizar este amigurumi personalizado:",
      `- Diseño: ${data.get("nombre")}`,
      `- Tamaño: ${data.get("tamano")}`,
      `- Colores: ${data.get("colores")}`,
      `- Estilo: ${data.get("estilo")}`,
      `- Extras: ${extras.length ? extras.join(", ") : "Sin extras"}`,
      `- Comentarios: ${data.get("comentarios") || "Ninguno"}`,
      `- Presupuesto estimado web: ${formatCop(total)} COP`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/57TU_NUMERO?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
})();
