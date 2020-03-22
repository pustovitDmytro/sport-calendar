import { URL } from 'url';
import axios from 'axios';
import ms from 'ms';
import Error from 'src/error';
import { API_CLIENT_HTTP_ERRORS } from 'src/constants';
import logger, { trackLogger } from 'lib/logger';
import { resolveUrl } from 'src/utils';

class ApiError extends Error {
    constructor(httpError, opts) {
        const code = httpError.code || httpError.response.status;
        const errCode = opts.HTTP_ERRORS?.[code] || opts.DEFAULT_ERROR;

        super(errCode, { code: opts.ERROR_CODE, httpError });
    }

    stringify() {
        return {
            error : this.render(),
            stack : this.stack,
            http  : {
                ...this.payload.httpError.toJSON(),
                response : this.payload.httpError.response
            }
        };
    }
}

export default class ApiClient {
    constructor({ timeout = '3 minutes', url, mock, apiKey }) {
        this.timeout = ms(timeout);
        if (url) {
            this.url = new URL(url);
        }
        this.apiKey = apiKey;
        if (mock) {
            this.isMock = true;
            this.log = trackLogger.log.bind(trackLogger, 'info');
        }
    }

    HTTP_ERRORS = API_CLIENT_HTTP_ERRORS
    DEFAULT_ERROR='UNKNOWN_API_ERROR'
    ERROR_CODE='API_ERROR'

    _getUrl(relativeUrl) {
        return resolveUrl(this.url, relativeUrl);
    }

    _getHeaders() {
        return {
            'Content-Type' : 'application/json',
            'Accept'       : 'application/json'
        };
    }

    async request(method, url, reqOptions = {}, settings = {}) {
        const { headers, data, params, ...options } = reqOptions;

        if (this.isMock) {
            if (this.log) {
                this.log({ method, url, ...reqOptions, api: this.constructor.name });
            }

            return;
        }
        try {
            const response = await axios({
                timeout : this.timeout,
                method,
                url     : this._getUrl(url).href,
                headers : headers || this._getHeaders(),
                data    : data || {},
                params  : params || {},
                ...options
            });

            const handleResponse = settings.handleResponse || this.handleResponse;

            return handleResponse(response.data);
        } catch (error) {
            this.throwApiError(error);
        }
    }

    get(url, params, options = {}) {
        return this.request('GET', url, {
            params,
            ...options
        });
    }

    post(url, data, options = {}) {
        return this.request('POST', url, {
            data,
            ...options
        });
    }

    patch(url, data, options = {}) {
        return this.request('PATCH', url, {
            data,
            ...options
        });
    }

    getStream(url) {
        return this.request(
            'GET',
            url,
            { responseType: 'stream' },
            { handleResponse: r => r }
        );
    }

    throwApiError(httpError) {
        const error = new ApiError(httpError, {
            HTTP_ERRORS   : this.HTTP_ERRORS,
            DEFAULT_ERROR : this.DEFAULT_ERROR,
            ERROR_CODE    : this.ERROR_CODE
        });

        logger.log('error', error.stringify());

        throw error;
    }

    handleResponse(data) {
        return data;
    }
}
