import Script from 'next/script';

import { SITE_DOMAIN } from '@/lib/env';

export default function PlausibleScript() {
  return <Script defer data-domain={SITE_DOMAIN} src='https://app.pageview.app/js/script.js' />;
}
