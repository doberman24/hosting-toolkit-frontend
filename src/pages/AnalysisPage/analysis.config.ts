import type { Status, IStatusDescription, DescriptionStatusType } from '@/types/status.types';

export class StatusDescription implements IStatusDescription {
    statusDescription: DescriptionStatusType;
    constructor(ok: string, warning: string, error: string) {
        this.statusDescription = {ok, warning, error};
    }

    getStatus(status: Status): string {
        return this.statusDescription[status];
    }
}

export const configStatusDNS: StatusDescription = new StatusDescription (
    'DNS-записи настроены правильно',
    'Обнаружены потенциальные проблемы DNS',
    'Обнаружены ошибки в DNS'
);
export const configStatusSSL: StatusDescription = new StatusDescription (
    'Сайт защищён: сертификат SSL/TLS активен',
    'Обнаружены ограничения конфигурации SSL',
    'Защищённое соединение не настроено'
);
export const configStatusHTTP: StatusDescription = new StatusDescription (
    'HTTP-ответ получен без ошибок. Сайт доступен.',
    'Возможны задержки при загрузке сайта',
    'Возвращается ошибка HTTP. Сайт недоступен.'
);
export const configStatusMail: StatusDescription = new StatusDescription (
    'Почтовая конфигурация корректна',
    'Отсутствуют некоторые механизмы защиты',
    'Обнаружены критические ошибки почты'
);
export const configStatusSummary: StatusDescription = new StatusDescription (
    'Сайт работает корректно',
    'Есть незначительные проблемы',
    'Обнаружены критические ошибки'
)

export const keyMapping = {
    domain: 'Домен',
    checkedAt: 'Последняя проверка',
    status: 'Статус',
    aRecords: 'A-записи',
    aaaaRecords: 'AAAA-записи (IPv6)',
    ttl: 'TTL',
    nameservers: 'NS-серверы',
    issuer: 'Центр сертификации',
    validFrom: 'Действителен с',
    validTo: 'Действителен до',
    daysRemaining: 'Осталось дней',
    protocol: 'Протокол',
    statusCode: 'Код ответа',
    responseTimeMs: 'Время ответа',
    redirects: 'Редиректы',
    finalUrl: 'Итоговый URL',
    mxRecords: 'MX-записи',
    host: 'Сервер',
    priority: 'Приоритет',
    spf: 'SPF',
    dmarc: 'DMARK',
    dkim: 'DKIM',
    score: 'Оценка',
} as const;

export type FieldName = keyof typeof keyMapping;

export const emptyStatuses = {
    aRecords: {
        empty: '—',
        not_found: 'A-записи не найдены'
    },
    aaaaRecords: {
        warning: 'IPv6 не настроен',
        not_found: 'AAAA-записи не найдены'
    },
    ttl: {
        empty: '—',
        undefined: '—'
    },
    nameservers: {
        empty: '—',
        undefined: 'NS-серверы не определены'
    },
    issuer: {
        empty: 'Сертификат не найден',
        undefined: 'Сертификат отсутствует  '
    },
    validFrom:{
        empty: '—',
        undefined: '—'
    },
    validTo: {
        empty: '—',
        undefined: 'Срок действия не определён'
    },
    daysRemaining: {
        empty: '—',
        expire: 'Срок действия истёк'
    },
    protocol: {
        empty: '—',
        undefined: 'Протокол не определён'
    },
    statusCode: {
        empty: '—',
        not_response: 'Сервер не отвечает'
    },
    responseTimeMs: {
        empty: '—',
        not_response: 'Нет ответа'
    },
    redirects: {
        ok: 'Нет',
        many_redirects: 'слишком много редиректов',
        undefined: '—'
    },
    finalUrl: {
        warning: '—',
        undefined: 'Не получен'
    },
    mxRecords: {
        no_records: 'MX-записи отсутствуют',
        not_found: 'MX-записи не найдены'
    },
    spf: {
        no_records: 'SPF-запись отсутствует',
        not_configured: 'SPF не настроен'
    },
    dmarc: {
        no_records: 'DMARC-запись отсутствует',
        not_configured: 'DMARC не настроен'
    },
    dkim: {
        no_records: 'Нет',
        not_configured: 'DKIM не настроен'
    }
} as const;
export type EmptyValueKeys = keyof typeof emptyStatuses;