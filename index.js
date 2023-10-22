async function carousel(data) {
    let text = data.split('')
    for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("---");
        let indexes = []
        let newText = []
        let counter = 0;
        for (let j = i; j < i + text.length; j++) {
            const index = (counter + j) % text.length;
            indexes.push(index)
        }
        for (let j = 0; j < text.length; j++) {
            newText[j] = text[indexes[j]]
        }
        // setText(newText)
        console.log(newText.join(""));
        counter++
    }
}

carousel("12 Rules For Life: An Antidote to Caos. ")