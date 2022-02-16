/**
 * @name BetterNSFWBypass
 * @source https://github.com/Eld3rly/BetterNSFWBypass
 */
/*@cc_on
@if (@_jscript)
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%/BetterDiscord/plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you"ve mistakenly tried to run me directly. \n(Don"t do that!)", 0, "I"m a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I"m in the correct folder already.", 0, "I"m already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can"t find the BetterDiscord plugins folder.\nAre you sure it"s even installed?", 0, "Can"t install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord"s plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I"m installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();
@else@*/

module.exports = (() => {
	const config = {
		"info":{
			"name":"BetterNSFWBypass",
			"authors":[
				{
					"name":"Eld3rly",
					"discord_id":"816606535912259594",
					"github_username":"Eld3rly"
				}
			],
			"version":"0.0.1",
			"description":"BetterDiscord plugin that bypasses age verification for NSFW channels.",
			"github":"https://github.com/Eld3rly/BetterNSFWBypass",
			"github_raw":"https://raw.githubusercontent.com/Eld3rly/BetterNSFWBypass/main/BetterNSFWBypass.plugin.js"
		},
		"changelog":[ ///Fixes:"fixed", Improvements:"improved", Added:"new", On-going:"progress"
			{
				"title":"Release",
				"type":"new",
				"items":[
					"Plugin released",
				]
			}
		],
		"main":"index.js"
	};

	return !global.ZeresPluginLibrary ? class {
		constructor() {this._config = config;}
		getName() {return config.info.name;}
		getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
		getDescription() {return config.info.description;}
		getVersion() {return config.info.version;}
		load() {
			BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
				confirmText: "Download Now",
				cancelText: "Cancel",
				onConfirm: () => {
					require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
						if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
						await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
					});
				}
			});
		}
		start() {}
		stop() {}
	} : (([Plugin, Api]) => {
		const plugin = (Plugin, Library) => {

		const {Logger, Patcher, Settings} = Library;

		return class BetterNSFWBypass extends Plugin {
			constructor() {
				super();
			}
		
			bypass() {
				const v = BdApi.findModuleByProps("getCurrentUser").getCurrentUser();
				if (typeof v == "undefined") return;
				v.nsfwAllowed = true;
			}

			onStart() {
				this.bypass();
			}

			onSwitch() {
				this.bypass();
			}
		};
	};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/