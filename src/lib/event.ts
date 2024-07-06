import type { Base } from "@lib/client.js";
import type { ClientEvents } from "discord.js";

export abstract class Event implements EventOptions {
	readonly name: EventOptions["name"];
	readonly once?: EventOptions["once"];

	protected constructor(options: EventOptions) {
		this.name = options.name;
		this.once = options.once;
	}

	abstract run(client: Base, ...params: unknown[]): void | Promise<void>;
}

interface EventOptions {
	name: keyof ClientEvents;
	once?: boolean;
}
