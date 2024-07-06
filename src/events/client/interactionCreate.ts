import type { Base } from "@lib/client.js";
import { Event } from "@lib/event.js";
import { Events } from "discord.js";
import type { Interaction } from "discord.js";

export default class ReadyEvent extends Event {
	constructor() {
		super({
			name: Events.InteractionCreate,
			once: false,
		});
	}

	/**
	 *
	 * @param client
	 * @param {import("discord.js").Interaction} interaction
	 */
	run(client: Base, interaction: Interaction) {
		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (command) command.run(client, interaction);
		}
	}
}
