export default {
  logger: {
    level: 'debug',
  },
  tables: {
    catalog: 'MSVCCatalogTable',
    permission: 'PermissionsTable',
  },
  dynamo: {
    region: 'local',
    endpoint: 'http://host.docker.internal:8000',
    create_tables: true,
  },
};
