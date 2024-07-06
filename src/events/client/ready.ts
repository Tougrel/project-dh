import type { Base } from "@lib/client.js";
import { Event } from "@lib/event.js";
import { Events } from "discord.js";

export default class ReadyEvent extends Event {
	constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	async run(client: Base) {
		console.log(`Client ready. Logged in as ${client.user?.username}`);

		await client.commandHandler();
	}
}
