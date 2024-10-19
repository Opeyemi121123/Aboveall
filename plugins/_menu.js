const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp } = require("../lib");
const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const astro_patch = require("../lib/plugins");

// Variable to keep track of the current design index
let currentDesignIndex = 0;

// Function to get the next menu design
function getNextMenuDesign() {
  const designs = [
    {
      header: "🌟✨━━━⟪ *{botname}* ⟫━━━✨🌟\n",
      lineSeparator: "─ ",
      commandPrefix: "➤ ",
      footer: "🌌✨━━━━━━━━━━━━━✨🌌",
      emoji: "🔹",
      greetingText: "Step into a world of possibilities.",
      categorySeparator: "━━━━━━━━━━━━━\n",
    },
    {
      header: "🌿🍃━━━⟪ *{botname}* ⟫━━━🍃🌿\n",
      lineSeparator: "• ",
      commandPrefix: "↠ ",
      footer: "🌿🍃━━━━━━━━━━━━━🍃🌿",
      emoji: "🌱",
      greetingText: "Welcome, seeker of knowledge. Here’s what I can do for you:",
      categorySeparator: "⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n",
    },
    {
      header: "🔥⚡━━⟪ *{botname}* ⟫━━⚡🔥\n",
      lineSeparator: "‣ ",
      commandPrefix: "⚔️ ",
      footer: "🔥⚡━━━━━━━━━━━━━━⚡🔥",
      emoji: "🛡️",
      greetingText: "Ready for action? Here’s your command arsenal:",
      categorySeparator: "─────────────────\n",
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

// Command handler with an updated layout and style
astro_patch.smd({
  'cmdname': "menu",
  'desc': "Displays a refreshed command list with style",
  'react': '🤡',
  'type': 'user',
  'filename': __filename
}, async (context, message) => {
  try {
    // Display a loading message with a stylish touch
    const loadingMessages = [
      "🌌 Preparing your personalized experience...",
      "✨ Just a moment, bringing the magic to you!"
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

    // Adjusted time intervals for more specific greetings
    if (hours >= 5 && hours < 9) {
      greeting = "🌄 *Rise and Shine!* - A new dawn awaits, let's make it count.";
    } else if (hours >= 9 && hours < 12) {
      greeting = "☀️ *Good Morning!* - Bright and early, ready to conquer the day!";
    } else if (hours >= 12 && hours < 15) {
      greeting = "🌞 *Good Noon!* - Keep your spirits high as the sun shines!";
    } else if (hours >= 15 && hours < 18) {
      greeting = "🌇 *Good Afternoon!* - A little break might go a long way.";
    } else if (hours >= 18 && hours < 20) {
      greeting = "🌆 *Good Evening!* - The sunset brings peace, enjoy the moment.";
    } else if (hours >= 20 && hours < 23) {
      greeting = "🌙 *Good Night!* - The stars are out, time to relax.";
    } else {
      greeting = "✨ *Late Night Vibes!* - Perfect time for introspection and dreams.";
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
    menuContent += `${lineSeparator}👤 *Owner:* ${Config.ownername}\n`;
    menuContent += `${lineSeparator}⏳ *Uptime:* ${runtime(process.uptime())}\n`;
    menuContent += `${lineSeparator}🧠 *Memory Usage:* ${formatp(os.totalmem() - os.freemem())}\n`;
    menuContent += `${lineSeparator}📅 *Date:* ${currentDate}\n`;
    menuContent += `${lineSeparator}📚 *Total Commands:* ${commands.length}\n`;
    menuContent += `${lineSeparator}${greeting}\n\n`;

    // List commands by category with decorative separators
    for (const category in commandCategories) {
      menuContent += `${design.categorySeparator}`;
      menuContent += `${design.emoji} *${tiny(category)}* ${design.emoji}\n`;
      commandCategories[category].forEach(cmd => {
        menuContent += `${lineSeparator}${design.commandPrefix}${fancytext(cmd, 1)}\n`;
      });
    }

    menuContent += `\n${footer}\n\n${design.emoji} *${Config.botname}* - Here to assist whenever you need.\n`;
    menuContent += `💫 Made with care by The One Above All.\n${readmore}`;

    // Send the menu with a "forwarded" tag
    const menuOptions = {
      'caption': menuContent,
      'contextInfo': {
        'forwardingScore': 100, 
        'isForwarded': true,
        'externalAdReply': {
          'title': 'Explore More with {botname}',
          'sourceUrl': 'https://whatsapp.com/channel/0029Vas9N7MBA1f0yw8dZ515'
        }
      },
      'ephemeralExpiration': 3000
    };

    // Send the menu
    await context.sendUi(context.chat, menuOptions, context);

  } catch (error) {
    await context.error(`🚨 Error: ${error.message}`, error);
  }
});
