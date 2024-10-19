const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
const astro_patch = require("../lib/plugins");

const readmore = String.fromCharCode(0x200e).repeat(0x100); // Shortened readmore

// Variable to keep track of the current design index
let currentDesignIndex = 0;

// Function to get the next menu design
function getNextMenuDesign() {
  const designs = [
    {
      header: "🦇🕯️━━━⟪ *{botname}*® ⟫━━━🕯️🦇\n",
      lineSeparator: "┃ ",
      commandPrefix: "🖤 ",
      footer: "🦇🕯️━━━━━━━━━━━━━™🕯️🦇",
      emoji: "🕸️",
      greetingText: "Welcome to the shadows!",
      categorySeparator: "🦇🕯️🦇🕯️🦇🕯️🦇🕯️🦇🕯️🦇🕯️\n",
    },
    {
      header: "🕷️🖤━━━⟪ *{botname}* ⟫━━━🖤🕷️\n",
      lineSeparator: "┃ ",
      commandPrefix: "⚰️ ",
      footer: "🕷️🖤━━━━━━━━━━━━━™🖤🕷️",
      emoji: "🩸",
      greetingText: "Enter the realm of the dark!",
      categorySeparator: "🕷️🖤🕷️🖤🕷️🖤🕷️🖤🕷️🖤🕷️🖤\n",
    },
    {
      header: "⚜️🔮━━━⟪ *{botname}* ⟫━━━🔮⚜️\n",
      lineSeparator: "┃ ",
      commandPrefix: "🕯️ ",
      footer: "⚜️🔮━━━━━━━━━━━━━™🔮⚜️",
      emoji: "🖤",
      greetingText: "Join the Gothic voyage!",
      categorySeparator: "⚜️🔮⚜️🔮⚜️🔮⚜️🔮⚜️🔮⚜️🔮⚜️\n",
    }
  ];

  // Get the current design
  const design = designs[currentDesignIndex];

  // Update the index for the next design
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
      "Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍 ìʂ ҟìղց"
    ];
    for (const msg of loadingMessages) {
      await context.sendMessage(context.chat, { text: msg });
      await sleep(1000); // Wait for 1 second between messages
    }

    // Display the menu after loading
    const { commands } = require("../lib");
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const currentDate = currentTime.toLocaleDateString();
    let greeting = "";

    // Gothic-style fun and catchy greetings based on time of day
    if (hours >= 5 && hours < 9) {
      greeting = "🦇 *Mornings are for the bold!* 🦇 - Seize the shadows!";
    } else if (hours >= 9 && hours < 12) {
      greeting = "🕸️ *Good Morning, Dark Soul!* 🕸️ - Embrace the day!";
    } else if (hours >= 12 && hours < 15) {
      greeting = "🕯️ *Afternoon Awaits!* 🕯️ - Keep conquering!";
    } else if (hours >= 15 && hours < 18) {
      greeting = "🕷️ *Late Afternoon Whispers!* 🕷️ - Almost through!";
    } else if (hours >= 18 && hours < 21) {
      greeting = "🖤 *Evening Shadows!* 🖤 - Time to relax!";
    } else if (hours >= 21 && hours < 23) {
      greeting = "⚰️ *Nightfall Calls!* ⚰️ - Rest and recharge!";
    } else {
      greeting = "🔮 *Late Night Mysteries!* 🔮 - Sleep tight!";
    }

    // Choose the next menu design
    const design = getNextMenuDesign();

    // Organize commands by category
    const commandCategories = {};
    commands.forEach(cmd => {
      if (!cmd.dontAddCommandList && cmd.pattern) {
        if (!commandCategories[cmd.category]) {
          commandCategories[cmd.category] = [];
        }
        commandCategories[cmd.category].push(cmd.pattern);
      }
    });

    // Build the menu content based on the chosen design
    const header = design.header.replace("{botname}", Config.botname);
    const lineSeparator = design.lineSeparator;
    const footer = design.footer;

    let menuContent = `${header}`;
    menuContent += `${lineSeparator}🕯️ *Master:* ${Config.ownername}\n`;
    menuContent += `${lineSeparator}⏳ *Uptime:* ${runtime(process.uptime())}\n`;
    menuContent += `${lineSeparator}🖤 *Memory Usage:* ${formatp(os.totalmem() - os.freemem())}\n`;
    menuContent += `${lineSeparator}📅 *Date:* ${currentDate}\n`;
    menuContent += `${lineSeparator}📜 *Total Commands:* ${commands.length}\n`;
    menuContent += `${lineSeparator}${greeting}\n\n`;

    // List commands by category with decorative separators
    for (const category in commandCategories) {
      menuContent += `${design.categorySeparator}`;
      menuContent += `${design.emoji} *${tiny(category)}* ${design.emoji}\n`;
      commandCategories[category].forEach(cmd => {
        menuContent += `┃   ${design.commandPrefix}${fancytext(cmd, 1)}\n`;
      });
    }

    menuContent += `\n${footer}\n\n${design.emoji} *${Config.botname}* - Your shadowy assistant\n`;
    menuContent += `©2024 Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍*\n${readmore}`;

    // Send the menu with a "forwarded" tag
    const menuOptions = {
      'caption': menuContent,
      'contextInfo': {
        'forwardingScore': 100,
        'isForwarded': true,
        'externalAdReply': {
          'title': 'ąҍօѵҽ ąӀӀ',
          'sourceUrl': 'https://whatsapp.com/channel/0029Vas9N7MBA1f0yw8dZ515'
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
