// console.log("inside doodle Classifier");

const len = 784;
const total_data = 1000;

let cats_data;
let trains_data;
let rainbows_data;

let cats = {};
let trains = {};
let rainbows = {};



// p5 version 0.65 (?)

// TODO: add a convolutional layer 
// Uint8Array(784000) type of array that can only store integers


// divide data into training and testing sets
function prepareData(category, data){
    category.training = [];
    category.testing = [];
    for (let i = 0; i < total_data; i++) {
        let offset = i * len;
        let threshold = floor(0.8 * total_data);
        if(i < threshold){
            category.training[i] = data.bytes.subarray(offset, offset + len);
        } else {
            category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
        }
    }
}



function preload(){
    cats_data = loadBytes('data/cats1000.bin');
    trains_data = loadBytes('data/trains1000.bin');
    rainbows_data = loadBytes('data/rainbows1000.bin');
}


function setup() {
    createCanvas(280, 280);
    background(0);
    prepareData(cats, cats_data);
    prepareData(trains, trains_data);
    prepareData(rainbows, rainbows_data);

    let total = 100;
    // each image
    for(let n = 0; n < total; n++){
        let img = createImage(28, 28);
        img.loadPixels();
        let offset = n * 784;
        // each pixel of each image
        for(let i = 0; i < 784 ; i ++){
             // look at that single value inside the cats.bytes array: 
                 // I need to take that value and give it to the red, green, & blue parts
            let val = 255 - cats_data.bytes[i + offset];
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



















