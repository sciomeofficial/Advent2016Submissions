let foundBot = null;
// Initilize the graph datastructure
class BotGraph {
    constructor() {
        this.graph = {};
    }
    // Add an output node to the graph
    addOutput(id) {
        let newOutput;

        if (!this.graph[id]) {
            newOutput = new OutputNode(id);
            this.graph[id] = newOutput;
        } else {
            newOutput = this.graph[id];
        }
        return newOutput;
    }
    // Add a bot to the graph
    addBot(id, lowerId = null, higherId = null) {

        let newBot;

        // If bot doesnt exist
        if (!this.graph[id]) {
            newBot = new BotNode(id);
            this.graph[id] = newBot;
        } else {
            newBot = this.graph[id];
        }

        // If it doesnt have any connections return
        if (!lowerId || !higherId) return newBot;

        // Check the id if its a bot or output
        newBot.lowerId = this.graph[lowerId] ||

            lowerId.indexOf('bot') !== -1 ?
            this.addBot(lowerId) :
            this.addOutput(lowerId);

        newBot.higherId = this.graph[higherId] ||

            higherId.indexOf('bot') !== -1 ?
            this.addBot(higherId) :
            this.addOutput(higherId);

        return newBot;

    }
}

// Initialize the bot datastructure
class BotNode {
    constructor(id) {
        this.id = id;
        this.values = [];
        this.lowerId = null;
        this.higherId = null;
    }
    // Add a value token to the bot
    addValue(token) {

        this.values.push(parseInt(token));
        // If the bot has two tokens
        if (this.values.length === 2) {


            // Check if its the special bot were looking for based on the two values
            if (Math.min(...this.values) === 17 && Math.max(...this.values) === 61) {
                foundBot = this.id;
            }



            // Pass the values down the chain
            this.lowerId.addValue(Math.min(...this.values))
            this.higherId.addValue(Math.max(...this.values));
            // reset the values
            this.values = [];
        }
    }
}

// Output node datastructure 
class OutputNode {
    constructor(id) {
        this.id = id;
        this.values = [];
    }
    addValue(token) {
        this.values.push(parseInt(token));
    }
}

module.exports = function(input) {
    // First create the graph
    var myGraph = new BotGraph();
    // Hold the values data to pass down after graph is created
    let taskArray = [];
    // Make copy and split by newline
    let lines = input.split('\n');

    lines.forEach((line) => {
        // If the line is a bot definition add to graph
        if (line.startsWith('bot ')) {

            let phraseSplit = line.split(' ');

            let botId = phraseSplit[0] + ' ' + phraseSplit[1];

            let lowerId = phraseSplit[5] + ' ' + phraseSplit[6]
            let higherId = phraseSplit[10] + ' ' + phraseSplit[11]


            myGraph.addBot(botId, lowerId, higherId)

        }
        // If it is a starting value definition add to tasks
        if (line.startsWith('value ')) {
            let phraseSplit = line.split(' ');

            let value = phraseSplit[1];

            let botId = phraseSplit[4] + ' ' + phraseSplit[5];

            taskArray.push({
                value,
                botId
            });


        }


    });
    // Once graph is completed run through all the tasks by adding values to bots
    taskArray.forEach(task => {

        let myBot = myGraph.graph[task.botId]

        myBot.addValue(task.value);

    });
    // get the output sums
    let total = [...myGraph.graph['output 0'].values, ...myGraph.graph['output 1'].values, ...myGraph.graph['output 2'].values]
    // Multiply them
    total = total.length > 0 ? total.reduce((a, b) => a * b) : 0;
    // Return total and the foundBot
    return {
        foundBot,
        total
    }
};


