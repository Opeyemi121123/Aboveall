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

      let _0x446f76 = _0x543e4e.toLowerCase().split(" ")[0].trim();

      if (_0x446f76 === "on" || _0x446f76 === "enable" || _0x446f76 === "act") {
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
        _0x446f76 === "off" ||
        _0x446f76 === "disable" ||
        _0x446f76 === "deact"
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
    } catch (_0x4bb48d) {
      await _0x5c3dd1.error(
        _0x4bb48d + "\n\nCommand: AntiViewOnce",
        _0x4bb48d
      );
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
        let _0x58b72c = await _0x4a4a25.bot.downloadAndSaveMediaMessage(
          _0x4a4a25.msg
        );

        // Constructing the notification message
        let notificationMessage = `*[VIEWONCE MESSAGE RETRIEVED]*\n\n` +
          `*SENDER:* @${_0x4a4a25.participant || 'Unknown'}\n` + 
          `*TIME:* ${new Date().toLocaleTimeString()}\n` + 
          `*CHAT:* ${_0x4a4a25.remoteJid || 'Unknown Chat'}\n` + 
          `*MESSAGE:* ${_0x4a4a25.body || 'No message content'}\n`; 

        // Send the downloaded media to the user's DM with the notification message
        await _0x4a4a25.bot.sendMessage(
          _0x4a4a25.user,  // Sending to user's DM
          {
            [_0x4a4a25.mtype2.split("Message")[0]]: {
              url: _0x58b72c,
            },
            caption: notificationMessage,
          }
        );
      }
    } catch (_0x6010c1) {
      console.log("Error while getting AntiViewOnce media: ", _0x6010c1);
    }
  }
);
