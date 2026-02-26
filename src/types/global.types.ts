import type { DNSResult, HTTPResult, MailResult, SSLResult } from "./analysis.types";

export interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children: string,
    disabled?: boolean,
};

export type cardData = DNSResult | SSLResult | HTTPResult | MailResult;