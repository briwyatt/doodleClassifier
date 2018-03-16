// console.log("inside doodle Classifier");

const len = 784;
const total_data = 1000;

// map each category to a number 
const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats_data;
let trains_data;
let rainbows_data;

let cats = {};
let trains = {};
let rainbows = {};

let nn;

// TODO: add a convolutional layer 
// Uint8Array(784000) type of array that can only store integers


// divide data into training and testing sets
function prepareData(category, data, label){
    category.training = [];
    category.testing = [];
    for (let i = 0; i < total_data; i++) {
        let offset = i * len;
        let threshold = floor(0.8 * total_data);
        if(i < threshold){
            category.training[i] = data.bytes.subarray(offset, offset + len);
            category.training[i].label = label;
        } else {
            category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
            category.testing[i - threshold].label = label;
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

    // Preparing the data 
    prepareData(cats, cats_data, CAT);
    prepareData(trains, trains_data, TRAIN);
    prepareData(rainbows, rainbows_data, RAINBOW);

// Create the neural network
    nn = new NeuralNetwork(784, 64, 3);


//  train NN with all training data shuffled in random order
    let training = [];
    
    training = training.concat(cats.training);
    training = training.concat(trains.training);
    training = training.concat(rainbows.training);
    shuffle(training, true);
    // console.log("training", training);

//  Train for one epoch (over all 2,400 elements)
 for (let i = 0; i < training.length; i++) {
    // for (let i = 0; i < 1; i++){
        let inputs = [];
        let data = training[i];
        for (let j = 0; j < data.length; j++){
            inputs[j] = data[j] / 255.0;
        }
        let label = training[i].label;
        let targets = [0, 0, 0];
        targets[label] = 1;
        // console.log(inputs);
        // console.log(targets);


        // takes input data and return some outputs,
        // random went starts 
        nn.train(inputs, targets);
    }

    console.log("trained for one epoch");

    let total = 100;
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















