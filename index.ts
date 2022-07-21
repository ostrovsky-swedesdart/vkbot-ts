import { MessageContext, VK } from "vk-io";
import { HearManager } from "@vk-io/hear";

export const vk = new VK({
token: process.env.TOKEN
});

const hearManager = new HearManager<MessageContext>();

vk.updates.use<MessageContext>(async (ctx, next) => {
if (ctx.is(["message"])) {
if (ctx.isGroup || ctx.isOutBox) return;

await next();
}
});

vk.updates.on("message", async (ctx, next) => {
const msgPing = Date.now() // Узнаем дату в миллисекундах
const ping = await ctx.send("секунду...");
await vk.api.messages.edit({
peer_id: ctx.peerId,
message_id: message.id,
message: `ping: ${Date.now() - ms}`
});
});

vk.updates.on("message", hearManager.middleware);

vk.updates.start();
