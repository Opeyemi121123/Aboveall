const { smd, bot_ } = require("../lib");
let bgmm = false;

// Command to enable or disable the AntiViewOnce feature
smd(
  {
    cmdname: "antiviewonce",
    alias: ["antivv"],
    desc: "Turn On/Off auto ViewOnce Downloader",
    fromMe: true,
    type: "user",
    use: "<on/off>",
    filename: __filename,
  },
  async (_0x5c3dd1, _0x543e4e) => {
    try {
      // Retrieve or create the bot settings for the user
      bgmm =
        (await bot_.findOne({
          id: "bot_" + _0x5c3dd1.user,
        })) ||
        (await bot_.new({
          id: "bot_" + _0x5c3dd1.user,
        }));

      let command = _0x543e4e.toLowerCase().split(" ")[0].trim();

      if (command === "on" || command === "enable" || command === "act") {
        if (bgmm.antiviewonce === "true") {
          return await _0x5c3dd1.reply("*AntiViewOnce already enabled!*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x5c3dd1.user,
          },
          {
            antiviewonce: "true",
          }
        );
        return await _0x5c3dd1.reply("*AntiViewOnce successfully enabled*");
      } else if (
        command === "off" ||
        command === "disable" ||
        command === "deact"
      ) {
        if (bgmm.antiviewonce === "false") {
          return await _0x5c3dd1.reply("*AntiViewOnce already disabled*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x5c3dd1.user,
          },
          {
            antiviewonce: "false",
          }
        );
        return await _0x5c3dd1.reply("*AntiViewOnce successfully deactivated*");
      } else {
        return await _0x5c3dd1.send(
          "*_Use on/off to enable/disable AntiViewOnce!_*"
        );
      }
    } catch (error) {
      console.error("Error in AntiViewOnce command: ", error);
      await _0x5c3dd1.reply("An error occurred while processing the command.");
    }
  }
);

// Handler for ViewOnce messages
smd(
  {
    on: "viewonce",
  },
  async (_0x4a4a25, _0x1400fa) => {
    try {
      // Retrieve bot settings for the user
      if (!bgmm) {
        bgmm = await bot_.findOne({
          id: "bot_" + _0x4a4a25.user,
        });
      }

      // Check if AntiViewOnce is enabled
      if (bgmm && bgmm.antiviewonce === "true") {
        // Download the ViewOnce media
        let mediaUrl = await _0x4a4a25.bot.downloadAndSaveMediaMessage(
          _0x4a4a25.msg
        );

        // Retrieve sender's name
        let senderName = _0x4a4a25.participant ? 
          (await _0x4a4a25.bot.getContact(_0x4a4a25.participant)).name || _0x4a4a25.participant : 'Unknown';

        // Determine chat name (group name or user name)
        let chatName;
        if (_0x4a4a25.remoteJid && _0x4a4a25.remoteJid.includes('conference')) {
            // If the message is from a group chat
            chatName = _0x4a4a25.remoteJid.split('@')[0]; // Extract group name
        } else {
            // If the message is a direct message
            chatName = (await _0x4a4a25.bot.getContact(_0x4a4a25.user)).name || _0x4a4a25.user; // Use user's WhatsApp name or fallback to JID
        }

        // Constructing the notification message
        let notificationMessage = `*[VIEWONCE MESSAGE RETRIEVED]*\n\n` +
          `*SENDER:* ${senderName}\n` + 
          `*TIME:* ${new Date().toLocaleTimeString()}\n` + 
          `*CHAT:* ${chatName}\n` + 
          `*MESSAGE:* ${_0x4a4a25.body || 'No message content'}\n`;

        // Send the downloaded media to the user's DM with the notification message
        await _0x4a4a25.bot.sendMessage(
          _0x4a4a25.user,  // Sending to user's DM
          {
            [_0x4a4a25.mtype2.split("Message")[0]]: {
              url: mediaUrl,
            },
            caption: notificationMessage,
          }
        );
      }
    } catch (error) {
      console.error("Error while processing ViewOnce message: ", error);
    }
  }
);
                                     
