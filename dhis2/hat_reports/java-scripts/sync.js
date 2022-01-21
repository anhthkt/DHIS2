(async function() {
    const splittedText = ["Hello", "World", "How", "Are", "You", "Today"];
    let text ="";

    for (const name of splittedText) {
        if (name === "Are") {
            await new Promise((resolve) => {
                setTimeout(() => {
                    text = text + "ARE ";
                    resolve();
                }, 2000);
            });
        } else {
            text += name + " ";
        }  
        console.log(text)
    };
})();