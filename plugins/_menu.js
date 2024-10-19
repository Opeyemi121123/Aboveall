const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp } = require("../lib");
const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const astro_patch = require("../lib/plugins");

// Path to the anime audio folder
const audioFolderPath = path.join(__dirname, '../lib');

// Function to send smooth anime background audio
async function sendAnimeBackgroundAudio(context, fileName) {
  try {
    const filePath = path.join(audioFolderPath, fileName);
    if (fs.existsSync(filePath)) {
      const audio = fs.readFileSync(filePath);
      const messageOptions = {
        audio: audio,
        mimetype: 'audio/mpeg'
      };
      await context.sendMessage(context.chat, messageOptions);
    } else {
      throw new Error('File not found.');
    }
  } catch (error) {
    await context.error(`🚨 Error sending background audio: ${error.message}`, error);
  }
}

// Variable to keep track of the current design index
let currentDesignIndex = 0;

// Function to get the next menu design
function getNextMenuDesign() {
  const designs = [
    {
      header: "🌌✨━━━⟪ *{botname}*® ⟫━━━✨🌌\n",
      lineSeparator: "💫 ",
      commandPrefix: "🌠 ➤ ",
      footer: "🌙✨━━━━━━━━━━━━━━✨🌙",
      emoji: "🪄",
      greetingText: "Welcome, traveler! You've stepped into a realm of mystery.",
      categorySeparator: "🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠\n",
    },
    {
      header: "🌿🌟━━━━━⟪ *{botname}* ⟫━━━━━🌟🌿\n",
      lineSeparator: "🌿 ",
      commandPrefix: "🌸 ➤ ",
      footer: "🌸🌿━━━━━━━━━━━━━🌿🌸",
      emoji: "🍃",
      greetingText: "Nature’s wisdom guides you here, be at peace.",
      categorySeparator: "🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿\n",
    },
    {
      header: "🔥⚔️━━⟪ *{botname}* ⟫━━⚔️🔥\n",
      lineSeparator: "🔥 ",
      commandPrefix: "💥 ➤ ",
      footer: "🔥⚔️━━━━━━━━━━━━━⚔️🔥",
      emoji: "💀",
      greetingText: "Brave souls face challenges head-on. Prepare yourself!",
      categorySeparator: "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n",
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

// Command handler with enhanced theme and aesthetics
astro_patch.smd({
  'cmdname': "menu",
  'desc': "Displays a vivid command list with style",
  'react': '🤡',
  'type': 'user',
  'filename': __filename
}, async (context, message) => {
  try {
    // Display a loading message with a stylish touch
    const loadingMessages = [
      "💫 The One Above All ☠️👑🌍 is preparing your experience..."
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

    // Refined greetings based on time of day
    if (hours >= 5 && hours < 12) {
      greeting = "🌅 *Good Morning!* 🌅 - Let’s conquer the day together!";
    } else if (hours >= 12 && hours < 17) {
      greeting = "🌞 *Good Afternoon!* 🌞 - Hope your day is going splendidly!";
    } else if (hours >= 17 && hours < 20) {
      greeting = "🌇 *Good Evening!* 🌇 - Unwind and enjoy the twilight!";
    } else {
      greeting = "🌌 *Good Night!* 🌌 - May your dreams be as serene as the stars.";
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
    menuContent += `${lineSeparator}👑 *Owner:* ${Config.ownername}\n`;
    menuContent += `${lineSeparator}⏱️ *Uptime:* ${runtime(process.uptime())}\n`;
    menuContent += `${lineSeparator}💻 *Memory Usage:* ${formatp(os.totalmem() - os.freemem())}\n`;
    menuContent += `${lineSeparator}📅 *Date:* ${currentDate}\n`;
    menuContent += `${lineSeparator}📊 *Total Commands:* ${commands.length}\n`;
    menuContent += `${lineSeparator}${greeting}\n\n`;

    // List commands by category with aesthetic separators
    for (const category in commandCategories) {
      menuContent += `${design.categorySeparator}`;
      menuContent += `${design.emoji} *${tiny(category)}* ${design.emoji}\n`;
      commandCategories[category].forEach(cmd => {
        menuContent += `${lineSeparator}${design.commandPrefix}${fancytext(cmd, 1)}\n`;
      });
    }

    menuContent += `\n${footer}\n\n${design.emoji} *${Config.botname}* - Your trusted guide\n`;
    menuContent += `©2024 The One Above All ☠️👑🌍\n${readmore}`;

    // Send the menu with a "forwarded" tag
    const menuOptions = {
      'caption': menuContent,
      'contextInfo': {
        'forwardingScore': 100, 
        'isForwarded': true,
        'externalAdReply': {
          'title': 'The One Above All',
          'sourceUrl': 'https://whatsapp.com/channel/0029VaeW5Tw4yltQOYIO5E2D'
        }
      },
      'ephemeralExpiration': 3000
    };

    // Send the menu
    await context.sendUi(context.chat, menuOptions, context);

    // Play soft background audio after sending the menu
    await sendAnimeBackgroundAudio(context, 'alya.mp3');

  } catch (error) {
    await context.error(`🚨 Error: ${error.message}`, error);
  }
});
