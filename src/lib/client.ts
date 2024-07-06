import { readdir } from "node:fs/promises";
import { isDev } from "@main";
import type { ClientOptions } from "discord.js";
import { Client, Collection } from "discord.js";

// TODO: add comments
export class Base extends Client {
	public commands: Collection<string, import("./command").Command> = new Collection();

	constructor(options: ClientOptions) {
		super(options);

		this.login(process.env.APPLICATION_TOKEN).catch((err) => {
			throw new Error("Something went wrong while trying to login!", {
				cause: err,
			});
		});
	}

	init() {
		this.eventHandler().catch(console.error);
	}

	/**
	 * TODO: add a *good* description
	 */
	private async eventHandler() {
		try {
			// Read all directories inside the /events/ folder
			const directories = isDev ? await readdir("./dist/events/") : await readdir("./dist/events/");

			// Go through all the directory folders inside /events/
			for (const directory of directories) {
				// Read the directory inside the /events/ to get its event files
				const files = isDev ? await readdir(`./events/${directory}`) : await readdir(`./dist/events/${directory}/`);

				// Go through all the event files
				for (const file of files) {
					// Import the event
					const event = new (await import(`../events/${directory}/${file}`)).default();

					// Run the event once or continuously depending on the options presented
					event.once ? this.once(event.name, event.run.bind(event, this)) : this.on(event.name, event.run.bind(event, this));
				}
			}
		} catch (err) {
			// Catch and print any error that might appear with a generic message and the cause
			console.error(new Error("Something went wrong in the event handler!", { cause: err }));
		}
	}

	/**
	 * TODO: add a *good* description
	 */
	public async commandHandler() {
		try {
			// Read all directories inside the /commands/ folder
			const directories = isDev ? await readdir("./dist/commands/") : await readdir("./dist/commands/");

			// Go through all the directory folders inside /commands/
			for (const directory of directories) {
				// Read the directory inside the /commands/ to get its command files
				const files = isDev ? await readdir(`./commands/${directory}`) : await readdir(`./dist/commands/${directory}/`);

				// Go through all the command files
				for (const file of files) {
					// Import the command
					const command = new (await import(`../commands/${directory}/${file}`)).default();

					// Put the command inside our collection to use later
					this.commands.set(command.name, command);
				}
			}
		} catch (err) {
			// Catch and print any error that might appear with a generic message and the cause
			console.error(new Error("Something went wrong in the command handler!", { cause: err }));
		}
	}
}
