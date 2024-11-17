import 'server-only';
import { auth } from '@clerk/nextjs/server';
import { Svix } from 'svix';
import { env } from '../env';

const svix = new Svix(env.SVIX_TOKEN);

export const send = async (
  eventType: string,
  payload: Record<string, unknown>
) => {
  const { orgId } = await auth();

  if (!orgId) {
    return;
  }

  return svix.message.create(orgId, {
    eventType,
    payload: {
      eventType,
      ...payload,
    },
    application: {
      name: orgId,
      uid: orgId,
    },
  });
};

export const getAppPortal = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return;
  }

  return svix.authentication.appPortalAccess(orgId, {
    application: {
      name: orgId,
      uid: orgId,
    },
  });
};
