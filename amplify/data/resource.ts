import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Project: a
    .model({
      name: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),

      // Make it optional in the schema; your UI sets it on create/update.
      statusMode: a.enum(['auto', 'manual']),

      // Optional: only set when statusMode === 'manual'
      manualStatus: a.enum(['Initiated', 'In Progress', 'Completed']),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
