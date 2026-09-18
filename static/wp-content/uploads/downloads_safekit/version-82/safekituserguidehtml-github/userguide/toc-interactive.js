  document.addEventListener("DOMContentLoaded", function () {
    const toc2 = document.querySelectorAll("p.MsoToc2");
    const toc3 = document.querySelectorAll("p.MsoToc3");

    // Masquer tous les niveaux 2 et 3 au chargement
    [...toc2, ...toc3].forEach(p => p.style.display = "none");

    // Gestion des clics sur les niveaux 1
    const headers = document.querySelectorAll("p.MsoToc1");

    headers.forEach((header1, index) => {
      header1.style.cursor = "pointer";
      header1.addEventListener("click", () => {
        console.log("Index du header cliqué :", index);
    
        let sibling = header1.nextElementSibling;
    
        // Masquer tous les TOC2 et TOC3
        [...toc2, ...toc3].forEach(p => p.style.display = "none");
    
        // Afficher les TOC2 qui suivent ce MsoToc1 jusqu'au prochain MsoToc1
        while (sibling && !sibling.classList.contains("MsoToc1")) {
          if (sibling.classList.contains("MsoToc2")) {
            sibling.style.display = "block";
          }
          sibling = sibling.nextElementSibling;
        }
      });
    });

    // Gestion des clics sur les niveaux 2 pour afficher leurs enfants TOC3
    document.querySelectorAll("p.MsoToc2").forEach(header2 => {
      header2.style.cursor = "pointer";
      header2.addEventListener("click", () => {
        let sibling = header2.nextElementSibling;

        // Masquer tous les TOC3 d’abord
        toc3.forEach(p => p.style.display = "none");

        // Afficher les TOC3 qui suivent ce MsoToc2 jusqu’au prochain MsoToc1 ou MsoToc2
        while (sibling && !sibling.classList.contains("MsoToc1") && !sibling.classList.contains("MsoToc2")) {
          if (sibling.classList.contains("MsoToc3")) {
            sibling.style.display = "block";
          }
          sibling = sibling.nextElementSibling;
        }
      });
    });
  });