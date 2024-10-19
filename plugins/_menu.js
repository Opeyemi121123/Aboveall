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
      header: "✦✧━━━⟪ *{botname}*® ⟫━━━✧✦\n",
      lineSeparator: "┃ ",
      commandPrefix: "🕸️ ",
      footer: "⦿⟫━┏━⟫⦿\n",
      greetingText: "Apologize to me, you're in my world!",
      categorySeparator: "⦿⟫━┏━⟫⦿\n",
    },
    {
      header: "❖❖━━━━━⟪ *{botname}* ⟫━━━━━❖❖\n",
      lineSeparator: "┃ ",
      commandPrefix: "👽 ",
      footer: "⦿⟫━┏━⟫⦿\n",
      greetingText: "Welcome to my world!",
      categorySeparator: "⦿⟫━┏━⟫⦿\n",
    },
    {
      header: "⚔️ ━━━⟪ *{botname}* ⟫━━━ ®⚔️\n",
      lineSeparator: "┃ ",
      commandPrefix: "🔥 ",
      footer: "⦿⟫━┏━⟫⦿\n",
      greetingText: "Go fuck yourself 🤡!",
      categorySeparator: "⦿⟫━┏━⟫⦿\n",
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
  'react': '🤡',
  'type': 'user',
  'filename': __filename
}, async (context, message) => {
  try {
    // Display loading messages
    const loadingMessages = [
      "Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍 ìʂ ҟìղց"];
    for (const msg of loadingMessages) {
      await context.sendMessage(context.chat, { text: msg });
      await sleep(1000); // Wait for 1 second between messages
    }

    // Display the menu after loading
    const { commands } = require("../lib");
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentDate = currentTime.toLocaleDateString();
    const currentTimeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    let greeting = "";

    // Anime-style greetings based on time of day with additional intervals
    if (hours >= 5 && hours < 9) {
      greeting = "🌸 *Good Morning* 🌸 - Time for a fresh start!";
    } else if (hours >= 9 && hours < 12) {
      greeting = "🌞 *Mid-Morning* 🌞 - Keep the momentum going!";
    } else if (hours >= 12 && hours < 15) {
      greeting = "🌞 *Good Afternoon* 🌞 - Keep up the great work!";
    } else if (hours >= 15 && hours < 18) {
      greeting = "🌅 *Late Afternoon* 🌅 - Almost time to relax!";
    } else if (hours >= 18 && hours < 20) {
      greeting = "🌆 *Good Evening* 🌆 - Unwind and relax!";
    } else if (hours >= 20 && hours < 22) {
      greeting = "🌃 *Late Evening* 🌃 - Getting ready for rest!";
    } else {
      greeting = "🌙 *Good Night* 🌙 - Rest and recharge!";
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
    menuContent += `${lineSeparator}🕒 *Uptime:* ${runtime(process.uptime())}\n`;
    menuContent += `${lineSeparator}💻 *RAM Usage:* ${formatp(os.totalmem() - os.freemem())}\n`;
    menuContent += `${lineSeparator}📅 *Date:* ${currentDate}\n`;
    menuContent += `${lineSeparator}🕰️ *Current Time:* ${currentTimeString}\n`;
    menuContent += `${lineSeparator}📊 *Total Commands:* ${commands.length}\n`;
    menuContent += `${lineSeparator}${greeting}\n\n`;

    // Create submenu buttons for each category
    let buttons = [];

    for (const category in commandCategories) {
      const buttonId = `submenu_${category}`;
      buttons.push({
        buttonId: buttonId,
        buttonText: { displayText: category.charAt(0).toUpperCase() + category.slice(1) },
        type: 1
      });

      astro_patch.smd({
        'cmdname': buttonId,
        'desc': `Displays the ${category} commands`,
        'react': '📜',
        'type': 'user',
        'filename': __filename
      }, async (context, message) => {
        try {
          const submenuHeader = `${design.header.replace("{botname}", Config.botname)}\n⦿ *${category}* ⦿\n`;
          let submenuContent = `${submenuHeader}`;
          commandCategories[category].forEach(cmd => {
            submenuContent += `┃   ${design.commandPrefix}${fancytext(cmd, 1)}\n`;
          });
          submenuContent += `\n${footer}\n⦿ *${Config.botname}* - Your assistant\n`;
          submenuContent += `©2024 Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍*\n${readmore}`;
          
          await context.sendMessage(context.chat, {
            text: submenuContent
          });
        } catch (error) {
          await context.error(`Error: ${error.message}`, error);
        }
      });
    }

    menuContent += `\n${footer}\n⦿ *${Config.botname}* - Your assistant\n`;
    menuContent += `©2024 Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍*\n${readmore}`;

    // Send the main menu with buttons
    await context.sendMessage(context.chat, {
      text: menuContent,
      buttons: buttons,
      headerType: 1
    });

  } catch (error) {
    await context.error(`Error: ${error.message}`, error);
  }
});
