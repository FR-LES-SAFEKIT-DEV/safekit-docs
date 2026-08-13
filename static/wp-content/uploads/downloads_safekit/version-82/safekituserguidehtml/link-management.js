  document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function(event) {
        const target = event.target;
        const link = target.closest("a");
        const path = link.pathname;
        const basename = path.substring(path.lastIndexOf('/') + 1);

        if (link && link.origin === window.location.origin && (basename === "" || basename.startsWith("safekit"))) {
          // internal link
          if (link.hash) {
            const hash = link.hash; 
            if (hash) {
                console.log("Hash clicked :", hash);
                window.parent.postMessage({ type: "hashClicked", toc: hash }, "*");
            }
          }
        } else {
            // external link
            event.preventDefault(); 
            window.open(link.href, "_blank");
        }
    });
  })
