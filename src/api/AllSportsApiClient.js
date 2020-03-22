// import Error from 'src/error';
// import { verbose } from 'lib/logger';
// import { dumpUpdate, dumpMessage } from 'src/utils';
// import config from 'config';
import ApiClient from './ApiClient';

export default @verbose class TelegramApiClient extends ApiClient {
    handleResponse(response) {
        if (!response.ok) throw response;

        return response.result;
    }
    throwApiError(httpError, message) {
        const isHttpError = !!httpError.isAxiosError;

        if (isHttpError) return super.throwApiError(httpError);

        const error = new Error('INTERNAL_TELEGRAM_ERROR', {
            httpError,
            code : this.ERROR_CODE
        });

        error.message = message || JSON.stringify(httpError);

        throw error;
    }

    async getUpdates(lastUpdate = 0) {
        const data = await this.get('/getUpdates', {
            limit  : 10,
            offset : lastUpdate + 1
        });

        return data.map(dumpUpdate);
    }

    async sendMessage(chatId, html) {
        const data = await this.post('/sendMessage', {
            'parse_mode'               : 'HTML',
            'chat_id'                  : chatId,
            text                       : html,
            'disable_web_page_preview' : true
        });

        return dumpMessage(data);
    }

    async setWebhook(url) {
        const data = await this.post('/setWebhook', {
            url
        });

        if (data) return url;
    }

    async getWebhook() {
        const data = await this.get('/getWebhookInfo');

        if (this.isMock) return config.updates.webhook;

        return data.url;
    }
}
