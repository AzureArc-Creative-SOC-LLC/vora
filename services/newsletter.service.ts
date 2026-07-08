// Newsletter service — POST /api/newsletter/subscribe (public, rate-limited 5/hr).
// The honeypot `website` field is always sent empty, as the backend requires.

import { apiClient } from "@/lib/apiClient";
import type { NewsletterResponse } from "@/types/api";

export interface SubscribeResult {
  subscribed: boolean;
  alreadySubscribed: boolean;
  id?: number;
}

export async function subscribeNewsletter(
  email: string,
  source = "footer_research_updates"
): Promise<SubscribeResult> {
  const data = await apiClient.post<NewsletterResponse>("/api/newsletter/subscribe", {
    email: email.trim(),
    consent: true,
    source,
    website: "", // honeypot — must stay empty
  });
  return {
    subscribed: !!data.ok,
    alreadySubscribed: !!data.already_subscribed,
    id: data.id,
  };
}
