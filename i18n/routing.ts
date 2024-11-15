import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

import { config } from './config';

export const routing = defineRouting(config);

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
