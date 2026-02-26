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

export const emptyStatus = {
    aRecords: {
        warning: '—',
        error: 'A-записи не найдены'
    },
    aaaaRecords: {
        warning: 'IPv6 не настроен',
        error: 'AAAA-записи не найдены'
    },
    ttl: {
        warning: '—',
        error: '—'
    },
    nameservers: {
        warning: '—',
        error: 'NS-серверы не определены'
    },
    issuer: {
        warning: 'Сертификат не найден',
        error: 'Сертификат отсутствует  '
    },
    validFrom: {
        warning: '—',
        error: '—'
    },
    validTo: {
        warning: '—',
        error: 'Срок действия не определён'
    },
    daysRemaining: {
        warning: '—',
        error: 'Срок действия истёк'
    },
    protocol: {
        warning: '—',
        error: 'Протокол не определён'
    },
    statusCode: {
        warning: '—',
        error: 'Сервер не отвечает'
    },
    responseTimeMs: {
        warning: '—',
        error: 'Нет ответа'
    },
    redirects: {
        warning: 'Нет',
        error: 'слишком много редиректов'
    },
    finalUrl: {
        warning: '—',
        error: 'Не получен'
    },
    mxRecords: {
        warning: 'MX-записи отсутствуют',
        error: 'MX-записи не найдены'
    },
    spf: {
        warning: 'SPF-запись отсутствует',
        error: 'SPF не настроен'
    },
    dmarc: {
        warning: 'DMARC-запись отсутствует',
        error: 'DMARC не настроен'
    },
    dkim: {
        warning: 'Нет',
        error: 'DKIM не настроен'
    }
} as const;
export type EmptyValue = keyof typeof emptyStatus;