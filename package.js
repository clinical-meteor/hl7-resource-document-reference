Package.describe({
  name: 'clinical:hl7-resource-document-reference',
  version: '1.1.11',
  summary: 'HL7 FHIR Resource - Document Reference',
  git: 'https://github.com/clinical-meteor/hl7-resource-document-reference',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('ecmascript@0.9.0');

  api.use('aldeed:collection2@3.0.0');
  api.use('clinical:hl7-resource-datatypes@4.0.0');
  api.use('clinical:hl7-resource-bundle@1.4.0');

  api.use('simple:json-routes@2.1.0');
  api.use('clinical:base-model@1.4.0');

  if(Package['clinical:fhir-vault-server']){
    api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});
  }

  api.addFiles('lib/hl7-resource-document-reference.js', ['client', 'server']);

  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  api.export('DocumentReference');
  api.export('DocumentReferences');
  api.export('DocumentReferenceSchema');

  api.mainModule('index.jsx', 'client');
});

Npm.depends({
  "simpl-schema": "1.5.3",
  "moment": "2.22.2",
  "lodash": "4.17.4"
})