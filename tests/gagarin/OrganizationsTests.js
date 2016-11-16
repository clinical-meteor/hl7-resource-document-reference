describe('clinical:hl7-resources-document-references', function () {
  var server = meteor();
  var client = browser(server);

  it('DocumentReferenceSchemas should exist on the client', function () {
    return client.execute(function () {
      expect(DocumentReferenceSchemas).to.exist;
    });
  });

  it('DocumentReferenceSchemas should exist on the server', function () {
    return server.execute(function () {
      expect(DocumentReferenceSchemas).to.exist;
    });
  });

});
