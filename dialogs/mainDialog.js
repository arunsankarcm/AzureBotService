// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';
const TEXT_PROMPT = 'textPrompt';

class MainDialog extends ComponentDialog {
    constructor() {
        super('MainDialog');

        // Define the main dialog and its steps
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.introStep.bind(this),
            this.nameStep.bind(this),
            this.ageStep.bind(this),
            this.summaryStep.bind(this)
        ]));

        // The initial dialog to start
        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    /**
     * First step in the waterfall dialog. Prompts the user for their name.
     */
    async introStep(stepContext) {
        return await stepContext.prompt(TEXT_PROMPT, { prompt: 'Welcome! What is your name?' });
    }

    /**
     * Second step in the waterfall. Prompts the user for their age.
     */
    async nameStep(stepContext) {
        const name = stepContext.result;
        
        // Save the name for later use
        stepContext.values.name = name;
        
        return await stepContext.prompt(TEXT_PROMPT, { prompt: `Hi ${name}! How old are you?` });
    }

    /**
     * Third step in the waterfall. Displays a summary to the user.
     */
    async ageStep(stepContext) {
        const age = stepContext.result;
        
        // Save the age for later use
        stepContext.values.age = age;
        
        return await stepContext.prompt(TEXT_PROMPT, { prompt: 'Tell me something about yourself.' });
    }

    /**
     * Final step in the waterfall. Displays a summary to the user.
     */
    async summaryStep(stepContext) {
        const aboutYou = stepContext.result;
        const name = stepContext.values.name;
        const age = stepContext.values.age;
        
        await stepContext.context.sendActivity(`Nice to meet you, ${name}! You are ${age} years old and here's what you told me about yourself: "${aboutYou}"`);
        
        // Restart the dialog for demo purposes
        return await stepContext.replaceDialog(this.initialDialogId);
    }
}

module.exports.MainDialog = MainDialog; 