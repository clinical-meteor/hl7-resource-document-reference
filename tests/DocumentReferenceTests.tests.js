// describe('clinical:hl7-resources-document-references', function () {
//   var server = meteor();
//   var client = browser(server);

//   it('DocumentReferences should exist on the client', function () {
//     return client.execute(function () {
//       expect(DocumentReferences).to.exist;
//     });
//   });

//   it('DocumentReferences should exist on the server', function () {
//     return server.execute(function () {
//       expect(DocumentReferences).to.exist;
//     });
//   });

// });



describe('clinical:hl7-resource-document-reference', function () {
  beforeEach(function () {
    //console.log('beforeEach');
  });
  afterEach(function () {
    //console.log('afterEach');
  });
  it('exists globally', function () {
    expect(DocumentReferences).to.exist;
  });
});