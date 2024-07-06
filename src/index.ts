import "dotenv/config";
import { Base } from "@lib/client.js";
import { ActivityType, GatewayIntentBits } from "discord-api-types/v10";
import { Partials } from "discord.js";

// TODO: add comments here
export const client = new Base({
	partials: [Partials.User, Partials.GuildMember, Partials.ThreadMember, Partials.Channel],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
	],
	presence: {
		status: "online",
		activities: [
			{
				type: ActivityType.Playing,
				name: "with GitHub",
			},
		],
	},
});

client.init();

export const isDev = process.env.NODE_ENV === "development";
