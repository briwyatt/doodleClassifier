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


//  Train for one epoch (over all 2,400 elements)
function trainEpoch(training){
    shuffle(training, true);

    for (let i = 0; i < training.length; i++) {
            let data = training[i];
            let inputs = data.map(x => x / 255);
           
            let label = training[i].label;
            let targets = [0, 0, 0]; 
            targets[label] = 1; // one-hot encoding
            // console.log(inputs);
            // console.log(targets);

            // takes input data and return some outputs, (is random when it first starts)
            nn.train(inputs, targets);
        }
}

function testAll(testing){
    let correct = 0;
    shuffle(testing, true);
    for (let i = 0; i < testing.length; i++) {
            let data = testing[i];
            let inputs = data.map(x => x / 255);
            let label = testing[i].label;
            let guess = nn.predict(inputs);

            // argmax function will give you an index to the max value in an array
            let m = max(guess);
            let classification = guess.indexOf(m);
            // console.log("guess", guess);
            // console.log("classification", classification);
            // console.log("target label", label);
            if (classification === label) {
                correct++;
            }
        }
        let percent = correct / testing.length;
        return percent;
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

// prep all testing data
    let testing = [];
    testing = testing.concat(cats.testing);
    testing = testing.concat(trains.testing);
    testing = testing.concat(rainbows.testing);

 
    let percent = testAll(testing);
    console.log("% correct without training: ", + percent);

    trainEpoch(training);
    let percentt = testAll(testing);
    console.log("% correct after training 1 epoch: ", + percentt);

// i can evaluate how its going to do with the testing data
//  without actually training it -- the % accurate out of pure randomness should be 1/3rd
 testAll(testing);

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


// using javascript in the browser 
// training a neural network to recognize doodles of cats, trains, & rainbows



// TODO: I want to use testing data to see how accurately it is able to guess
//  before and after training



//  TODO: implement softmax as the method I use as an activation function 
//  that takes the output and transforms it into probability values that all equal = 100%
 












