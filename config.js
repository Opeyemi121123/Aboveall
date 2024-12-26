//#ENJOY
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
global.audio = "www.youtube.com";
global.video = "www.youtube.com";
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "jadewale71@gmail.com";
global.location = "Lagos, Nigeria";
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://astrofx0011:astro@cluster0.lmwnxdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/Jupiterbold05/Aboveall";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vas9N7MBA1f0yw8dZ515";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029Vas9N7MBA1f0yw8dZ515";
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://imgur.com/U1oSe2y";
global.devs = "2348084644182";
global.sudo = process.env.SUDO || "2349071978357";
global.owner = process.env.OWNER_NUMBER || "2349073905236";
global.style = process.env.STYLE || "3";
global.gdbye = process.env.GOODBYE || "true";
global.wlcm = process.env.WELCOME || "true";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG || "false";
global.userImages = process.env.USER_IMAGES || "https://imgur.com/U1oSe2y";
global.waPresence = process.env.WAPRESENCE || "unavailable";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "false";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";

global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://arthur-scanner.onrender.com/";

global.SESSION_ID =
  process.env.SESSION_ID ||
  "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktVbTFQNGZmRndaUCtDQVgvYzdtWGoyYSs4N0NvQ0RKZWJXaVd3OXBFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVERWakN5cmVzSVdZWVJTUDZrdzF4dXJ0Q2wwMURrd1ZmdVNxWXdjMEFFST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlSFpidlV1M1o2UkZuTjNLTnJ5Wm9IK0ZVSy9ackJDTVdDMDlHc3F4YlcwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyeEFNTkdHQmNRdHhIV0xWcG1HTjZ1NkhnT1dzeHZSUFRZR2Q1UE01d0JFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdPUFhQbm95aUxaQkh3VFp1bG8vKzF2UEZzakU3RDBVQSt5Z3Q5d1cyMGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1tRkxwVXo4eXR0Sm9pMmg0d014T1hjR3BSazRvL1Y3NmFFdkFwbmFqeFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUFjRmc3STRyMVFsaUtYMHAzNDdtQVRrWmRwNWNJYmt1elFNSzdmOHRHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGE1S2hWWXlhTkgyNVpBN0UwZVFhdjRITTBDSCthazBUWXFDcFd5WDJVQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inl3dlRLUjhBT0gxcUlNVWhyZHg4QWIwSU9MZW11L3o4RWxaT29GMDRMZjNSMGxIUWEwSzFWWjlzK2VpSi9IYUFxbDN5NW5mbWpHc3hoRmhkcUtCTmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk3LCJhZHZTZWNyZXRLZXkiOiI3THUybnZoTkJqV2wyd2JkSWdvcHRRZVpoWHNWZWUvSDNYR1lSM2pUT1ZZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzTGluaDJyelJiT1hPb0ZZOWVzNGdnIiwicGhvbmVJZCI6ImMxZjk5YTFlLTFhMTMtNDdlOC05YWQ2LWE3YTg3YzA2M2EwOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhNllUaDN4WWZudXlTMURsYTBSaWo2WG50UGc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU8rNGRKOEVmOWFNbDE3YzBSNHRZSWhHWjlzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNHSkVEQzNDIiwibWUiOnsiaWQiOiIyMzQ5MDczOTA1MjM2OjYwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik9wZXllbWkxMjPigJTNns2fzZ7Nn/CWo5gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1B6SjJJMEJFTVBFc3JzR0dDQWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImhqeHMycTM2T1VqZStkUXBhbDN1NXJnZWluNUxnSkpYTW83alBZSFBGa1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImlVRU1DL0pvbFhuSzdxckEwTlA1a0NOLy96L013WitTWklwN0N2U2F5ZzQxcGFMd3Z4bzhTYy9UTXEvdXdJeVFJMWVmSFFYNEZxR1VLUTFnR2k1MEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDRGlEN0RJMUtHVitCSG41S2dhclBZUHN0c1o2dmd1SzdLR3V2bWtIMmpON29zUVhmN3F1QnBCa0dBbnJBNWpZblM4RU9qUDNDMTNHRURhTzlQeEhqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwNzM5MDUyMzY6NjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWVk4Yk5xdCtqbEkzdm5VS1dwZDd1YTRIb3ArUzRDU1Z6S080ejJCenhaRyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNTE3MjY4OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIVDAifQ=="
module.exports = {
  menu: process.env.MENU || "2",
  HANDLERS: process.env.PREFIX || "?",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍™",
  author: process.env.PACK_AUTHER || "ąҍօѵҽ ąӀӀ ☠️👑🌍",
  packname: process.env.PACK_NAME || "ąҍօѵҽ ąӀӀ ☠️👑🌍",
  botname: process.env.BOT_NAME || "Ͳհҽ օղҽ ąҍօѵҽ ąӀӀ ☠️👑🌍",
  ownername: process.env.OWNER_NAME || "Opeyemi ☠️👑🌍",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "private",
  LANG: (process.env.THEME || "A L Y A").toUpperCase(),
};
global.rank = "updated";
global.isMongodb = true;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
