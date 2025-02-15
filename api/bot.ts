import { VercelRequest, VercelResponse } from '@vercel/node'
import { Bot, InlineKeyboard, webhookCallback } from 'grammy'

const { BOT_TOKEN, BOT_URL } = process.env

export const bot = new Bot(BOT_TOKEN)

bot.command('start', async (ctx) => {
    await ctx.reply('Welcome to use DDNS Bot')
})

bot.command('gethook', async (ctx) => {
    const chanId = ctx.message.chat.id
    const hookUrl = `${BOT_URL}/api/hook/${chanId}`
    const links = new InlineKeyboard()
        .url('Usage', 'https://github.com/cjs520/ddns-telegram-bot/blob/main/README.md')
    await ctx.reply(`Your Webhook URL:\n ${hookUrl}`, {
        reply_markup: links
    })
})

export default async (req: VercelRequest, res: VercelResponse) => {
    webhookCallback(bot, 'http')(req, res)
}
