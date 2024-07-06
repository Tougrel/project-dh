import type { Base } from "@lib/client.js";
import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export abstract class Command implements CommandOptions {
	readonly name: CommandOptions["name"];
	readonly category: CommandOptions["category"];
	readonly data: CommandOptions["data"];

	protected constructor(options: CommandOptions) {
		this.name = options.name;
		this.category = options.category;
		this.data = options.data;
	}

	abstract run(client: Base, interaction: ChatInputCommandInteraction): void | Promise<void>;
}

interface CommandOptions {
	name: string;
	category: string;
	data: SlashCommandBuilder;
}
