export default {
  logger: {
    level: 'debug',
  },
  tables: {
    catalog: process.env.MSVCCatalogTable,
    permission: process.env.PermissionsTable,
  },
  dynamo: {
    create_tables: process.env.CreateTables,
  },
};
