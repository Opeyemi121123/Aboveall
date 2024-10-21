const { smd } = require("../lib");
smd(
  {
    pattern: "save",
    desc: "Save whatsapp status",
    category: "whatsapp",
    filename: __filename,
    use: "< status >",
  },
  async (message) => {
    try {
      let mm =
        message.reply_message && message.reply_message.status
          ? message.reply_message
          : false;
      if (mm) {
        message.bot.forwardOrBroadCast(message.user, mm, {
          quoted: { key: mm.key, message: mm.message },
        });
      } else message.send("*reply to whatsapp status*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : #(Status Saver)`, e, false);
    }
  }
);
const regexSend = new RegExp(
  `\\b(?:${["send", "share", "snd", "give", "save", "sendme", "forward"].join(
    "|"
  )})\\b`,
  "i"
);
smd({ on: "quoted" }, async (message, text) => {
  try {
    let mm = message.reply_message.status ? message.reply_message : false;
    if (mm && regexSend.test(text.toLowerCase())) {
      message.bot.forwardOrBroadCast(
        message.fromMe ? message.user : message.from,
        mm,
        { quoted: { key: mm.key, message: mm.message } }
      );
    }
  } catch (e) {
    console.log(e);
  }
});

global.waPresence =
  process.env.WAPRESENCE && process.env.WAPRESENCE === "online"
    ? "available"
    : process.env.WAPRESENCE || "";
global.api_smd = "https://api-smd.onrender.com";

let status = false,
  times = 0;
smd({ on: "main" }, async (message, text, { icmd }) => {
  try {
    if (!status) {
      try {
        status = true;
      } catch (e) {}
    }

    if (message.status) return;
    if (
      `${global.readmessagefrom}`.includes(message.senderNum) ||
      ["yes", "true", "ok", "sure"].includes(global.readmessage) ||
      (icmd && ["yes", "true", "ok", "sure"].includes(global.readcmds))
    )
      message.bot.readMessages([message.key]);
  } catch (e) {
    console.log(e);
  }
});

smd({ on: "text" }, async (message, text, { icmd }) => {
  try {
    if (
      ["unavailable", "available", "composing", "recording", "paused"].includes(
        waPresence
      )
    )
      message.bot.sendPresenceUpdate(waPresence, message.from);
    if (message.isAstro && !message.fromMe && !message.text.startsWith("$"))
      message.react("");
  } catch (e) {
    console.log(e);
  }
});

smd({ on: "status" }, async (message, text) => {
  try {
    if (
      `${global.read_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
      ["yes", "true", "ok", "sure"].includes(global.read_status) ||
      message.fromMe ||
      message.isAstro
    ) {
      await message.bot.readMessages([{ ...message.key, fromMe: false }]);
    }
    if (
      (`${global.save_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
        ["yes", "true", "ok", "sure"].includes(global.save_status)) &&
      !message.fromMe
    ) {
      await message.bot.forwardOrBroadCast(message.user, message, {
        quoted: { key: message.key, message: message.message },
      });
    }
  } catch (e) {
    console.log(e);
  }
});
smd(
  {
    cmdname: "theone",
    desc: "theone",
    react: "💀",
    type: "misc",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://d.uguu.se/BBuWwwkQ.jpg",
        { caption: "*Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ìʂ ҟìղց 👑🌍*" },
        "img",
        m
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: aboveall`, e, false);
    }
  }
);
smd(
  {
    cmdname: "donate",
    desc: "Send donation details",
    type: "misc",
    react: "💰",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://i.imgur.com/DeJiOrr.jpeg",
        { caption: "*Support ABOVEALL OPay Bank: OPay Digital Services Limited(OPay) OPay Account: 8078144253 Name: ADENIKE AYOADE MARY Nigeria Show Love*" },
        "img",
        m
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: donate`, e, false);
    }
  }
);
 smd ( 
   {
  cmdname: "lili",
  desc: "Send a video to Luna",
  type: "fun",
  react: "🎥",
  filename: __filename,
},
async (m) => {
  const videoUrl = "https://f.uguu.se/fblVYEjM.mp4";
  const caption = "🎀🌈✿lili✿🎀🌈!";

  try {
    await m.sendMessage(m.from, {
      video: { url: videoUrl },
      caption: caption,
      mimetype: 'video/mp4'
    });
   } catch (e) {
    console.error(`${e}\n\nCommand: sendvideo`, e);
   }
 }
);
smd(
  {
    cmdname: "gay",
    desc: "Sends the 'Why are you gay' meme",
    react: "🤔",
    type: "misc",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://f.uguu.se/XHBGlVhK.jpg", // The image URL
        { caption: "*Why are you gay?*" }, // The caption
        "img", // The message type
        m // The message object
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: whyareyougay`, e, false);
    }
  }
);
smd(
  {
    cmdname: "theking",
    desc: "Sends an image with the caption 'Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ìʂ ҟìղց 👑🌍'",
    react: "👑",
    type: "misc",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://d.uguu.se/BBuWwwkQ.jpg", // The image URL
        { caption: "*Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ìʂ ҟìղց 👑🌍*" }, // The caption
        "img", // The message type
        m // The message object
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: theking`, e, false);
    }
  }
);
smd(
  {
    pattern: "gpt2",
    react: "🤖",
    desc: "Get a response from Bing AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.gpt What is life?`.");
      }

      // Send a loading message
      await m.send("Chill your answers are loading •••");

      // Define the API URL
      const apiUrl = `https://widipe.com/gpt4?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
        smd(
  {
    pattern: "bing2",
    desc: "Get a response from Bing AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.gpt What is life?`.");
      }

      // Send a loading message
      await m.send("Chill your answers are loading •••");

      // Define the API URL
      const apiUrl = `https://itzpire.com/ai/bing-ai?model=Precise&q=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
