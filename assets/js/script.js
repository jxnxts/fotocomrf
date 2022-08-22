(() => {
  const pictureInput = document.querySelector("input#picture");

  const tela1 = document.querySelector("section#tela01");
  const tela2 = document.querySelector("section#tela02");
  const tela3 = document.querySelector("section#tela03");
  const cardContainers = document.querySelector("div#cardcontainers");

  pictureInput.addEventListener("change", async (e) => {
    toggleDisplayElement(tela1);
    toggleDisplayElement(tela2);

    const formData = new FormData();

    formData.append("image", pictureInput.files[0]);
    try {
      const response = await fetch("https://fotocomrafael.herokuapp.com/to-com-rafael", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        console.log("Algum erro insperado");
      }

      const toComRafaelResponse = await response.json();

      toggleDisplayElement(tela2);
      toggleDisplayElement(tela3);

      toComRafaelResponse.links.forEach((link) => {
        cardContainers.innerHTML += `
		<div class="col-md-3">
			<div class="card">
			  <img src="${link}">
			  <span>Baixe ou compartilhe</span>
			  <div class="icons-share">
				<a href="https://www.facebook.com/sharer/sharer.php?u=${link}" class="face"></a>
				<a href="${link}" class="down"></a>
			  </div>
			</div>
		</div>
        `
      });
    } catch (err) {
      alert(err.message);
    }
  });

  function toggleDisplayElement(element) {
    const currentDisplay = element.style.display || "block";

    const options = {
      block: "none",
      none: "block",
    };

    element.style.display = options[currentDisplay];
  }
})();
