describe('clinical:hl7-resources-document-references', function () {
  var server = meteor();
  var client = browser(server);

  it('DocumentReferences should exist on the client', function () {
    return client.execute(function () {
      expect(DocumentReferences).to.exist;
    });
  });

  it('DocumentReferences should exist on the server', function () {
    return server.execute(function () {
      expect(DocumentReferences).to.exist;
    });
  });

});
