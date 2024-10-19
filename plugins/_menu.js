const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
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
      const audio = fs.readFileSync(filePath);  // Read the audio file
      const messageOptions = {
        audio: audio, 
        mimetype: 'audio/mpeg'
      };
      // Send audio message using the correct sendMessage function
      await context.sendMessage(context.chat, messageOptions);
    } else {
      throw new Error('File not found.');
    }
  } catch (error) {
    await context.error(`Error sending background audio: ${error.message}`, error);
  }
}

// Variable to keep track of the current design index
let currentDesignIndex = 0;

// Function to get the next menu design
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expandable Menu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: white;
            padding: 20px;
        }
        .menu-header {
            cursor: pointer;
            padding: 10px;
            background: #2C2C2C;
            border: 1px solid #444;
            border-radius: 5px;
            margin: 5px 0;
            transition: background 0.3s;
        }
        .menu-header:hover {
            background: #444;
        }
        .menu-content {
            display: none;
            padding: 10px;
            background: #1E1E1E;
            border-left: 3px solid #888;
            margin: 5px 0 15px 0;
            border-radius: 5px;
        }
    </style>
</head>
<body>

    <div id="menuContainer"></div>

    <script>
        function getNextMenuDesign() {
            const designs = [
                {
                    header: "🖤✨━━━⟪ *{botname}* ⟫━━━✨🖤",
                    commands: ["Help", "Info", "Settings"],
                    greetingText: "Welcome, wanderer, to the realm of shadows!",
                },
                {
                    header: "🌿🌑━━━━━⟪ *{botname}* 🦉 ⟫━━━━━🌑🌿",
                    commands: ["Magic", "Potions", "Creatures"],
                    greetingText: "Step lightly, magic is afoot!",
                },
                {
                    header: "🔥🕷️━━━⟪ *{botname}* ⟫━━━🕷️🔥",
                    commands: ["Chaos", "Destruction", "Adventure"],
                    greetingText: "Enter if you dare... the chaos awaits!",
                },
                {
                    header: "🔮🕯️━━━━⟪ *{botname}* ⟫━━━━🕯️🔮",
                    commands: ["Divination", "Herbs", "Spells"],
                    greetingText: "Gaze into the abyss and let the journey begin!",
                },
            ];

            return designs;
        }

        function renderMenu() {
            const menuContainer = document.getElementById('menuContainer');
            const designs = getNextMenuDesign();

            designs.forEach(design => {
                // Create menu header
                const header = document.createElement('div');
                header.className = 'menu-header';
                header.innerText = design.header;
                menuContainer.appendChild(header);

                // Create menu content
                const content = document.createElement('div');
                content.className = 'menu-content';

                // Add greeting text
                const greeting = document.createElement('p');
                greeting.innerText = design.greetingText;
                content.appendChild(greeting);

                // Add commands as a list
                const commandList = document.createElement('ul');
                design.commands.forEach(command => {
                    const listItem = document.createElement('li');
                    listItem.innerText = command;
                    commandList.appendChild(listItem);
                });
                content.appendChild(commandList);

                // Append content to menu
                menuContainer.appendChild(content);

                // Add click event to toggle content visibility
                header.addEventListener('click', () => {
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                });
            });
        }

        // Initialize the menu
        renderMenu();
    </script>
</body>
</html>
  ];

  // Return a random design from the array
  return designs[Math.floor(Math.random() * designs.length)];
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
    const currentDate = currentTime.toLocaleDateString();
    let greeting = "";

    // Anime-style greetings based on time of day
    if (hours >= 5 && hours < 12) {
      greeting = "🌸 *Good Morning* 🌸 - Time for a fresh start!";
    } else if (hours >= 12 && hours < 18) {
      greeting = "🌞 *Good Afternoon* 🌞 - Keep up the great work!";
    } else if (hours >= 18 && hours < 22) {
      greeting = "🌆 *Good Evening* 🌆 - Unwind and relax!";
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
    menuContent += `${lineSeparator}📊 *Total Commands:* ${commands.length}\n`;
    menuContent += `${lineSeparator}${greeting}\n\n`;

    // List commands by category with decorative separators
    for (const category in commandCategories) {
      menuContent += `${design.categorySeparator}`;
      menuContent += `${design.emoji} *${tiny(category)}* ${design.emoji}\n`;
      commandCategories[category].forEach(cmd => {
        menuContent += `┃   ${design.commandPrefix}${fancytext(cmd, 1)}\n`;
      });
    }

    menuContent += `\n${footer}\n\n${design.emoji} *${Config.botname}* - Your assistant\n`;
    menuContent += `©2024 Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍*\n${readmore}`;

    // Send the menu with a "forwarded" tag
    const menuOptions = {
      'caption': menuContent,
      'contextInfo': {
        'forwardingScore': 100, 
        'isForwarded': true,
        'externalAdReply': {
          'title': 'ąҍօѵҽ ąӀӀ',
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
    await context.error(`Error: ${error.message}`, error);
  }
});
