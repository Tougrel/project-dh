import type { Base } from "@lib/client.js";
import { Command } from "@lib/command.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default class About extends Command {
	constructor() {
		super({
			name: "about",
			category: "misc",
			data: new SlashCommandBuilder().setName("about").setDescription("Important info about this bot"),
		});
	}

	async run(client: Base, interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Yellow)
					.setTitle('"Project DH"')
					.setDescription(
						"This project is an open source discord bot created by the community of [Devhood](https://discord.gg/FSBxTWuFWJ)!\n\n[Github](https://github.com/Tougrel/project-dh) - [License](https://github.com/Tougrel/project-dh?tab=MPL-2.0-1-ov-file) - [Issues](https://github.com/Tougrel/project-dh/issues) - [New Issue](https://github.com/Tougrel/project-dh/issues/new)",
					)
					.setFooter({
						text: `Requested by ${interaction.user.globalName}`,
						iconURL: interaction.user.avatarURL() ?? interaction.user.defaultAvatarURL,
					})
					.setTimestamp(),
			],
			ephemeral: true,
		});
	}
}
