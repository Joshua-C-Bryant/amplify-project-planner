import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Project: a
    .model({
      name: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      statusMode: a.enum(['auto', 'manual']).default('auto'),
      manualStatus: a.enum(['Initiated', 'In Progress', 'Completed']).nullable(),
    })
    .authorization(allow => [allow.publicApiKey()]) // demo-friendly
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
