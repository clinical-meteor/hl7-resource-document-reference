
// JsonRoutes.Middleware.use(
//     '/api/*',
//     oAuth2Server.oauthserver.authorise()   // OAUTH FLOW - A7.1
// );




// JsonRoutes.add("get", "/fhir/DocumentReference/:id", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/DocumentReference/' + req.params.id);
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
//   var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

//   if (accessToken || process.env.NOAUTH) {
//     process.env.TRACE && console.log('accessToken', accessToken);
//     process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

//     if (typeof SiteStatistics === "object") {
//       SiteStatistics.update({_id: "configuration"}, {$inc:{
//         "DocumentReferences.count.read": 1 }});
//     }

//     var id = req.params.id;
//     var DocumentReferenceData = DocumentReferences.findOne(id); delete DocumentReferenceData._document;
//     process.env.TRACE && console.log('DocumentReferenceData', DocumentReferenceData);

//     JsonRoutes.sendResult(res, {
//       code: 200,
//       data: DocumentReferenceData
//     });
//   } else {
//     JsonRoutes.sendResult(res, {
//       code: 401
//     });
//   }
// });



// JsonRoutes.add("get", "/fhir/DocumentReference", function (req, res, next) { process.env.DEBUG && console.log('GET /fhir/DocumentReference', req.query);
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
//   var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

//   if (accessToken || process.env.NOAUTH) {
//     process.env.TRACE && console.log('accessToken', accessToken);
//     process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

//     if (typeof SiteStatistics === "object") {
//       SiteStatistics.update({_id: "configuration"}, {$inc:{
//         "DocumentReferences.count.search-type": 1 }});
//     }

//     var databaseQuery = {};

//     // // TODO:  Replace with Appointment specificy query parameters
//     //
//     // if (req.query.family) {
//     //   databaseQuery['name'] = {
//     //     $elemMatch: {
//     //       'family': req.query.family
//     //     }
//     //   };
//     // }
//     // if (req.query.given) {
//     //   databaseQuery['name'] = {
//     //     $elemMatch: {
//     //       'given': req.query.given
//     //     }
//     //   };
//     // }
//     // if (req.query.name) {
//     //   databaseQuery['name'] = {
//     //     $elemMatch: {
//     //       'text': req.query.text
//     //     }
//     //   };
//     // }
//     // if (req.query.identifier) {
//     //   databaseQuery['_id'] = req.query.identifier;
//     // }
//     // if (req.query.gender) {
//     //   databaseQuery['gender'] = req.query.gender;
//     // }
//     // if (req.query.birthdate) {
//     //   databaseQuery['birthDate'] = req.query.birthdate;
//     // }

//     process.env.DEBUG && console.log('databaseQuery', databaseQuery);
//     process.env.DEBUG && console.log('DocumentReferences.find(id)', DocumentReferences.find(databaseQuery).fetch()); // because we're using BaseModel and a _transform() function
//     // DocumentReferences returns an object instead of a pure JSON document // it stores a shadow reference of the original doc, which we're removing here
//     var DocumentReferenceData = DocumentReferences.find(databaseQuery).fetch();
//     DocumentReferenceData.forEach(function(patient){
//       delete patient._document;
//     });

//     JsonRoutes.sendResult(res, {
//       code: 200,
//       data: DocumentReferenceData
//     });
//   } else {
//     JsonRoutes.sendResult(res, {
//       code: 401
//     });
//   }
// });
