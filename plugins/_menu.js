const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
const astro_patch = require("../lib/plugins");

const readmore = String.fromCharCode(0x200e).repeat(0x100); // Shortened readmore
let currentDesignIndex = 0;

const designs = [
    {
        header: "🦇🕯️━━━⟪ *{botname}*® ⟫━━━🕯️🦇\\n",
        lineSeparator: "━━━━━━━━━━━━━━━━━━\\n",
        commandPrefix: "🖤 ",
        footer: "━━━━━━━━━━━━━━━━━━\\n🦇🕯️━━━━━━━━━━━━━™🕯️🦇",
        emoji: "🕸️",
        greetingText: "Welcome to the shadows!",
        categorySeparator: "🦇🕯️🦇🕯️🦇🕯️🦇🕯️\\n",
    },
    {
        header: "🕷️🖤━━━⟪ *{botname}* ⟫━━━🖤🕷️\\n",
        lineSeparator: "━━━━━━━━━━━━━━━━━━\\n",
        commandPrefix: "⚰️ ",
        footer: "━━━━━━━━━━━━━━━━━━\\n🕷️🖤━━━━━━━━━━━━━™🖤🕷️",
        emoji: "🩸",
        greetingText: "Enter the realm of the dark!",
        categorySeparator: "🕷️🖤🕷️🖤🕷️🖤🕷️🖤\\n",
    },
    {
        header: "⚜️🔮━━━⟪ *{botname}* ⟫━━━🔮⚜️\\n",
        lineSeparator: "━━━━━━━━━━━━━━━━━━\\n",
        commandPrefix: "🕯️ ",
        footer: "━━━━━━━━━━━━━━━━━━\\n⚜️🔮━━━━━━━━━━━━━™🔮⚜️",
        emoji: "🖤",
        greetingText: "Join the Gothic voyage!",
        categorySeparator: "⚜️🔮⚜️🔮⚜️🔮⚜️🔮\\n",
    }
];

// Get the next menu design
function getNextMenuDesign() {
    const design = designs[currentDesignIndex];
    currentDesignIndex = (currentDesignIndex + 1) % designs.length;
    return design;
}

// Sleep function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Command handler with subtle anime theme
astro_patch.smd({
    'cmdname': "menu",
    'desc': "Displays a calm, readable command list",
    'react': '🕸️',
    'type': 'user',
    'filename': __filename
}, async (context, message) => {
    try {
        // Display loading messages
        const loadingMessages = [
            "Summoning the dark menu...",
            "Fetching from the depths...",
            "Preparing your shadow commands..."
        ];

        for (const msg of loadingMessages) {
            await context.sendMessage(message.jid, msg);
            await sleep(1000);
        }

        const { commands } = require("../lib");
        const commandCategories = organizeCommands();
        const design = getNextMenuDesign();
        let menuContent = design.header.replace('{botname}', Config.BOT_NAME);
        menuContent += design.greetingText + "\\n\\n";

        for (const category in commandCategories) {
            menuContent += design.categorySeparator + prefix + category + "\\n" + design.categorySeparator;
            commandCategories[category].forEach(cmd => {
                menuContent += `${design.commandPrefix}${cmd.cmd} - ${cmd.desc}${design.emoji}\\n`;
            });
        }

        menuContent += design.footer + readmore;

        // Send the image first
        const imageUrl = 'https://i.imgur.com/j2bD2Bt.jpeg';
        await context.sendImage(message.jid, imageUrl, { caption: '' });

        // Send the menu with a "forwarded" tag
        const menuOptions = {
            'caption': menuContent,
            'contextInfo': {
                'forwardingScore': 100,
                'isForwarded': true,
                'externalAdReply': {
                    'title': 'ąҍօѵҽ ąӀӀ',
                    'sourceUrl': 'https://whatsapp.com/channel/0029Vas9N7MBA1f0yw8dD515'
                }
            },
            'ephemeralExpiration': 3000
        };

        // Send the menu
        await context.sendUi(context.chat, menuOptions, context);

    } catch (error) {
        await context.error(`Error: ${error.message}`, error);
    }
});

// Function to generate greeting based on the time of day
function getGreeting(hours) {
    if (hours >= 5 && hours < 9) {
        return "🦇 *Mornings are for the bold!* 🦇 - Seize the shadows!";
    } else if (hours >= 9 && hours < 12) {
        return "🕸️ *Good Morning, Dark Soul!* 🕸️ - Embrace the day!";
    } else if (hours >= 12 && hours < 15) {
        return "🕯️ *Afternoon Awaits!* 🕯️ - Keep conquering!";
    } else if (hours >= 15 && hours < 18) {
        return "🕷️ *Late Afternoon Whispers!* 🕷️ - Almost through!";
    } else if (hours >= 18 && hours < 21) {
        return "🖤 *Evening Shadows!* 🖤 - Time to relax!";
    } else if (hours >= 21 && hours < 23) {
        return "⚰️ *Nightfall Calls!* ⚰️ - Rest and recharge!";
    } else {
        return "🔮 *Late Night Mysteries!* 🔮 - Sleep tight!";
    }
}

// Function to organize commands by category
function organizeCommands() {
    const { commands } = require("../lib");
    const commandCategories = {};

    commands.forEach(cmd => {
        if (!cmd.dontAddCommandList && cmd.pattern) {
            if (!commandCategories[cmd.category]) {
                commandCategories[cmd.category] = [];
            }
            commandCategories[cmd.category].push(cmd);
        }
    });

    return commandCategories;
            }
