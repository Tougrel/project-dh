import "dotenv/config";
import { readdir } from "node:fs/promises";
import { Routes } from "discord-api-types/v10";
import { REST } from "discord.js";

// Code from: https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands
const rest = new REST().setToken(process.env.APPLICATION_TOKEN);

(async () => {
	const commands = [];
	try {
		const directories = await readdir("./dist/commands/");
		for (const directory of directories) {
			const files = await readdir(`./dist/commands/${directory}/`);
			for (const file of files) {
				const command = new (await import(`../dist/commands/${directory}/${file}`)).default();
				commands.push(command.data.toJSON());
			}
		}
	} catch (err) {
		console.error(new Error("Something went wrong in the command handler!", { cause: err }));
	}

	try {
		await rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: commands });
		console.log(`Successfully deployed ${commands.length} command(s) to ${process.env.GUILD_ID}.`);
	} catch (err) {
		console.error(new Error("Something went wrong trying to deploy the commands!", { cause: err }));
	}
})();
