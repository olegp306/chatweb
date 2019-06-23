import { createElement } from "react";

export default (compress = file => {
  const width = 500;
  const height = 300;
  const fileName = file.name;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  let newFile;
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;

    (img.onload = () => {
      const elem = document.createElement("canvas");
      
      width = 320;
      height = 200;
      
      const ctx = elem.getContext("2d");
      // img.width and img.height will contain the original dimensions
      ctx.drawImage(img, 0, 0, width, height);

      ctx.canvas.toBlob(
        blob => {
          const file = new File([blob], fileName, {
            type: "image/jpeg",
            lastModified: Date.now()
          });
        },
        "image/jpeg",
        1
      );
    }),
      (reader.onerror = error => console.log(error));
  };
});
