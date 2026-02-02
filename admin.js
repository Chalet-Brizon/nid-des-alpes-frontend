const API_BASE = "https://nid-des-cimes-backend.onrender.com";

// ===============================
// Charger les paramètres existants
// ===============================
async function loadSettings() {
  try {
    const res = await fetch(`${API_BASE}/api/settings`);
    const data = await res.json();

    const est = data.establishments[0];

    document.getElementById("name").value = est.name || "";
    document.getElementById("description").value = est.description || "";
    document.getElementById("whatsapp").value = est.whatsapp || "";
    document.getElementById("codeBoite").value = est.codeBoite || "";
    document.getElementById("lienAvis").value = est.lienAvis || "";
    document.getElementById("codePromoActif").checked = est.codePromoActif || false;
    document.getElementById("codePromo").value = est.codePromo || "";
    document.getElementById("textePromo").value = est.textePromo || "";
    document.getElementById("templateIndex").value = est.templateIndex || "classic";

  } catch (err) {
    console.error("Erreur chargement paramètres :", err);
    alert("Impossible de charger les paramètres.");
  }
}

// ===============================
// Sauvegarder les paramètres
// ===============================
document.getElementById("settingsForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    establishments: [
      {
        id: "nid-des-alpes",
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        whatsapp: document.getElementById("whatsapp").value,
        codeBoite: document.getElementById("codeBoite").value,
        lienAvis: document.getElementById("lienAvis").value,
        codePromoActif: document.getElementById("codePromoActif").checked,
        codePromo: document.getElementById("codePromo").value,
        textePromo: document.getElementById("textePromo").value,
        templateIndex: document.getElementById("templateIndex").value,
        logo: "/public/logo.png",
        photos: {
          chalet: [],
          salon: [],
          chambres: [],
          salleDeBain: [],
          vue: [],
          exterieur: [],
          parking: [],
          divers: []
        }
      }
    ]
  };

  try {
    await fetch(`${API_BASE}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    alert("Paramètres enregistrés !");
  } catch (err) {
    console.error("Erreur sauvegarde paramètres :", err);
    alert("Impossible d’enregistrer les paramètres.");
  }
});

// Charger automatiquement
loadSettings();
