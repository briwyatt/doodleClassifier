function trainEpoch(training){
    shuffle(training, true);
    //  Train for one epoch (over all 2,400 elements)
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
        return true;
}

function testAll(testing){
    let correct = 0;
    for (let i = 0; i < testing.length; i++) {
            let data = testing[i];
            let inputs = data.map(x => x / 255.0);
            let label = testing[i].label;
            let guess = nn.predict(inputs);

            // argmax function will give you an index to the max value in an array
            let m = max(guess); // find index of max number
            let classification = guess.indexOf(m);
            // console.log("guess", guess);
            // console.log("classification", classification);
            // console.log("target label", label);
            if (classification === label) {
                correct++;
            }
        }
        let percent = 100 * correct / testing.length;
        return percent;
}