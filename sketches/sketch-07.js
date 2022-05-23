<<<<<<< HEAD
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
=======
const canvasSketch = require("canvas-sketch");
const load = require("load-asset");
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  animate: false,
  row: 0.7,
  col: 0.925,
};
const sketch = async ({ update }) => {
  const image = await load("assets/baboon.jpg");

  update({
    dimensions: [image.width, image.height],
  });

  return ({ context, width, height }) => {
    
    // Render to canvas
    context.drawImage(image, 0, 0, width, height);

    // Extract bitmap pixel data
    const pixels = context.getImageData(0, 0, width, height);

    // Manipulate pixels
    const data = pixels.data;
    let len = width;
    while (len) {
      const newX = Math.floor(Math.random() * len--);
      const oldX = len;

      // Sometimes leave row in tact
      if (Math.random() > params.row) continue;

      for (let y = 0; y < height; y++) {
        // Sometimes leave column in tact
        if (Math.random() > params.row) continue;

        // Copy new random column into old column
        const newIndex = newX + y * width;
        const oldIndex = oldX + y * width;

        // Make 'grayscale' by just copying blue channel
        data[oldIndex * 4 + 0] = data[newIndex * 4 + 2];
        data[oldIndex * 4 + 1] = data[newIndex * 4 + 2];
        data[oldIndex * 4 + 2] = data[newIndex * 4 + 2];
      }
    }
    const createPane = () => {
      const pane = new Tweakpane.Pane();
      let folder;

      folder = pane.addFolder({ title: "edit " });
      //folder.addInput(params, "animate");
      folder.addInput(params, "row", { min: 0.01, max: 2, step: 0.01 });
      folder.addInput(params, "col", { min: 0.01, max: 2, step: 0.01 });
      folder = pane.addFolder({ title: "Noise " });
    };
    createPane();
    context.putImageData(pixels, 0, 0);
>>>>>>> 78e2360341eb31cd77025206371b7019d74ea6e6
  };
};

canvasSketch(sketch, settings);
