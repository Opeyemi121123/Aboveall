const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const astro_patch = require("../lib/plugins");

// Variable to keep track of the current design index
let currentDesignIndex = 0;

// Function to get the next menu design
function getNextMenuDesign() {
  const designs = [
    {
      header: "✦✧━━━⟪ *{botname}* ⟫━━━✧✦\n",
      lineSeparator: "◆ ",
      commandPrefix: "⊛ ",
      footer: "✦✧━━━━━━━━━━━━━✧✦",
      emoji: "🌠",
      greetingText: "Step into the realm of unlimited power!",
      categorySeparator: "✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦\n",
    },
    {
      header: "❖❖━━━━━⟪ *{botname}* ⟫━━━━━❖❖\n",
      lineSeparator: "✦ ",
      commandPrefix: "❖ ",
      footer: "❖❖━━━━━━━━━━━━❖❖",
      emoji: "✨",
      greetingText: "Welcome to your cosmic command hub!",
      categorySeparator: "❖❖❖❖❖❖❖❖❖❖❖❖❖❖\n",
    },
    {
      header: "⚔️ ━━━⟪ *{botname}* ⟫━━━ ⚔️\n",
      lineSeparator: "• ",
      commandPrefix: "⚔️ ",
      footer: "⚔️━━━━━━━━━━━━━⚔️",
      emoji: "⚡",
      greetingText: "Harness the strength of legends!",
      categorySeparator: "⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️\n",
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
  'react': '💮',
  'type': 'user',
  'filename': __filename
}, async (context, message) => {
  try {
    // Display loading messages
    const loadingMessages = [
      "The one above all is king y'all bow your heads 🙇"];
    for (const msg of loadingMessages) {
      await context.sendMessage(context.chat, { text: msg });
      await sleep(1000); // Wait for 1 second between messages
    }

    // Display the menu after loading
    const { commands } = require("../lib");
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const currentDate = currentTime.toLocaleDateString();
    const currentTimeString = `${hours}:${minutes}`;
    let greeting = "";

    // Anime-style greetings based on time of day
    if (hours >= 5 && hours < 9) {
      greeting = "🌸 *Good Morning* 🌸 - Time for a fresh start!";
    } else if (hours >= 9 && hours < 12) {
      greeting = "🌞 *It's still morning* 🌞 - You should get to work!";
    } else if (hours >= 12 && hours < 15) {
      greeting = "🌞 *Good Afternoon* 🌞 - Keep up the great work that is if you have any 😂!";
    } else if (hours >= 15 && hours < 18) {
      greeting = "🌆 *Good Evening* 🌆 - Unwind and relax!";
    } else if (hours >= 18 && hours < 21) {
      greeting = "🌝 *Still night* 🌝 - Reflect on your day!";
    } else if (hours >= 21 && hours < 23) {
      greeting = "⭐ *Still night obviously* ⭐ - Get ready to drop your phone!";
    } else {
      greeting = "🌙 *Good Night* 🌙 - Try dey sleep you no be winch!";
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
    menuContent += `${lineSeparator}${greeting}\n`;
    menuContent += `${lineSeparator}👤 *Owner:* ${Config.ownername}\n`;
    menuContent += `${lineSeparator}📅 *Date:* ${currentDate}\n`;
    menuContent += `${lineSeparator}⏰ *Time:* ${currentTimeString}\n`;
    menuContent += `${lineSeparator}⏳ *Uptime:* ${runtime(process.uptime())}\n`;
    menuContent += `${lineSeparator}🖥️ *RAM Usage:* ${formatp(os.totalmem() - os.freemem())}\n`;
    menuContent += `${lineSeparator}📊 *Total Commands:* ${commands.length}\n\n`;

    // List commands by category with decorative separators
    for (const category in commandCategories) {
      menuContent += `${design.categorySeparator}`;
      menuContent += `${design.emoji} *${tiny(category)}* ${design.emoji}\n`;
      commandCategories[category].forEach(cmd => {
        menuContent += `${lineSeparator}${design.commandPrefix}${fancytext(cmd, 1)}\n`;
      });
    }

    menuContent += `\n${footer}\n\n${design.emoji} *${Config.botname}* - Your assistant\n`;
    menuContent += `©2024 *JUPITERBOLD05*\n`;
    menuContent += `${readmore}`;

    // Send the menu with a "forwarded" tag
    const menuOptions = {
      'caption': menuContent,
      'contextInfo': {
        'forwardingScore': 100, 
        'isForwarded': true,
        'externalAdReply': {
          'title': 'ABOVEALL',
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
