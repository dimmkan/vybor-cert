import { Telegraf } from "telegraf";
import { ITelegramOptions } from "./telegram.interface";
export declare class TelegramService {
    bot: Telegraf;
    options: ITelegramOptions;
    constructor();
    sendMessage(message: string, chatId?: string): Promise<void>;
}
