// console.log("inside doodle Classifier");

let cats;
let trains;
let rainbows;


// p5 version 0.65 (?)

// TODO: add a convolutional layer 
// Uint8Array(784000) type of array that can only store integers


function preload(){
    cats = loadBytes('data/cats1000.bin');
    trains = loadBytes('data/trains1000.bin');
    rainbows = loadBytes('data/rainbows1000.bin');
}


function setup() {
    createCanvas(280, 280);
    background(0);

    let total = 100;
    // each image
    for(let n = 0; n < total; n++){
        let img = createImage(28, 28);
        img.loadPixels();
        let offset = n * 784;
        // each pixel of each image
        for(let i = 0; i < 784 ; i ++){
             // whats that single value inside the cats.bytes array: 
                 // I need to take that value and give it to the red, green, & blue parts
            let val = 255 - cats.bytes[i + offset];
            img.pixels[i * 4 + 0] = val; 
            img.pixels[i * 4 + 1] = val; 
            img.pixels[i * 4 + 2] = val;
            img.pixels[i * 4 + 3] = 255;

        }
        img.updatePixels();
        let x = (n % 10) * 28;
        let y = floor(n / 10) * 28;
        image(img, x, y);
    }

}



















