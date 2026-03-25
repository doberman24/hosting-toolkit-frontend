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
    responseTimeMs: 'Время загрузки',
    ttfbMs: 'Ответ сервера (TTFB)',
    serverTimeMs: 'Обработка на сервере',
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
        empty: 'IPv6 не настроен',
        not_found: 'AAAA-записи не найдены'
    },
    ttl: {
        empty: '—',
        undefined: '—',
        warning_status: 'Подозрительный TTL'
    },
    nameservers: {
        empty: '—',
        undefined: 'NS-серверы не определены',
        not_correct: {
            not_resolve: 'Не резолвится',
            warning_soa: 'Аномальный SOA', 
            warning_resolve: 'Посторонний сервер'
        }
    },
    issuer: {
        empty: '—',
        undefined: '—',
        broken_chain: 'Цепочка невалидна',
        self_signed: 'Самоподписанный сертификат',
        invalid_domain: 'Домен сертификата не совпадает',
    },
    validFrom:{
        empty: '—',
        undefined: '—',
        too_early: 'Еще не наступило'
    },
    validTo: {
        empty: '—',
        undefined: 'Срок действия не определён',
        expire: 'Просрочено',
    },
    daysRemaining: {
        empty: '—',
        expire: 'Сертификат просрочен',
        low_days: 'Срок подходит к концу',
        critical_low: 'Срок действия почти истек',
        undefined: '—'
    },
    protocol: {
        empty: '—',
        undefined: 'Протокол не определён'
    },
    statusCode: {
        empty: '—',
        not_response: 'Сервер не отвечает',
        error_4xx: 'Страница недоступна',
        error_5xx: 'Ошибка сервера'
    },
    responseTimeMs: {
        empty: '—',
        not_response: 'Нет ответа',
        critical: 'Очень медленная загрузка',
        slow: 'Медленная загрузка'
    },
    ttfbMs: {
        empty: '—',
        not_response: 'Нет ответа',
        critical: 'Критически долгий ответ',
        slow: 'Долгий ответ'
    },
    serverTimeMs: {
        empty: '—',
        not_response: 'Нет ответа',
        critical: 'Критчески долгая обработка',
        slow: 'Долгая обработка'
    },
    redirects: {
        excessive_redirects: 'Избыточно редиректов',
        too_mach_redirects: 'Слишком много редиректов',
        undefined: '—'
    },
    finalUrl: {
        empty: '—',
        not_protected: 'Соединение не защищено',
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