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
        header: "┏━••━━━⟪ *{botname}*® ⟫━━━••\n",
        lineSeparator: "━━━━━━━━━━━━━━━━━━\n",
        commandPrefix: "∆ ",
        footer: "━━━━━━━━━━━━━━━━━━\n°°━━━━━━━━━━━━━™°°",
        emoji: "🕸️",
        greetingText: "Welcome to the shadows!",
        categorySeparator: "━━━━━━━━━━━━━━━━━━\n",
    },
    {
        header: "┏━━━━━━━⟪ *{botname}* ⟫━━━━━━ \n",
        lineSeparator: "━━━━━━━━━━━━━━━━━━\n",
        commandPrefix: "⦿ ",
        footer: "━━━━━━━━━━━━━━━━━━\n••━━━━━━━━━━━━━••",
        emoji: "🩸",
        greetingText: "Enter the realm of the dark!",
        categorySeparator: "━━━━━━━━━━━━━\n",
    },
    {
        header: "┏━••━━━⟪ *{botname}* ⟫━━━••\n",
        lineSeparator: "━━━━━━━━━━━━━━━━━━\n",
        commandPrefix: "⦿ ",
        footer: "━━━━━━━━━━━━━━━━━━\n••━━━━━━━━━━━━━",
        emoji: "⦿",
        greetingText: "Join the Gothic voyage!",
        categorySeparator: "━━━━━━••━━━━━━\n",
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
            "Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍 ìʂҟìղց"
        ];
        for (const msg of loadingMessages) {
            await context.sendMessage(context.chat, { text: msg });
            await sleep(1000);
        }

        // Time and date handling
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const currentDate = currentTime.toLocaleDateString();
        const currentClockTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Generate greeting based on the time of day
        let greeting = getGreeting(hours);

        // Choose the next menu design
        const design = getNextMenuDesign();

        // Organize commands by category
        const commandCategories = organizeCommands();

        // Build the menu content based on the chosen design
        const header = design.header.replace("{botname}", Config.botname);
        const lineSeparator = design.lineSeparator;
        const footer = design.footer;

        let menuContent = `${header}`;
        menuContent += `${lineSeparator}🕯️ *Master:* ${Config.ownername}\n`;
        menuContent += `${lineSeparator}⏳ *Uptime:* ${runtime(process.uptime())}\n`;
        menuContent += `${lineSeparator}🖤 *Memory Usage:* ${formatp(os.totalmem() - os.freemem())}\n`;
        menuContent += `${lineSeparator}📅 *Date:* ${currentDate}\n`;
        menuContent += `${lineSeparator}🕒 *Current Time:* ${currentClockTime}\n`;
        menuContent += `${lineSeparator}📜 *Total Commands:* ${Object.keys(commandCategories).length}\n`;
        menuContent += `${lineSeparator}${greeting}\n\n`;

        // List commands by category with decorative separators
        for (const category in commandCategories) {
            menuContent += `${design.categorySeparator}`;
            menuContent += `${design.emoji} *${tiny(category)}* ${design.emoji}\n`;
            commandCategories[category].forEach(cmd => {
                menuContent += `┃   ${design.commandPrefix}${fancytext(cmd.pattern, 1)}\n`;
            });
        }

        menuContent += `${design.categorySeparator}\n${footer}\n\n${design.emoji} *${Config.botname}* - Your shadowy assistant\n`;
        menuContent += `©2024 Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍*\n${readmore}`;

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
        return "🦇 *Early morning na phone you fess carry na wa oh!* 🦇 - Seize the shadows!";
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
        return "🔮 *Late Night Mysteries!* 🔮 - Baba sleep you no be winch!";
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
        
