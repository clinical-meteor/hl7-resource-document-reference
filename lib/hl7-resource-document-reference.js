
// create the object using our BaseModel
DocumentReference = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
DocumentReference.prototype._collection = DocumentReferences;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
DocumentReferences = new Mongo.Collection('DocumentReferences');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
DocumentReferences._transform = function (document) {
  return new DocumentReference(document);
};


if (Meteor.isClient){
  Meteor.subscribe("DocumentReferences");
}

if (Meteor.isServer){
  Meteor.publish("DocumentReferences", function (argument){
    if (this.userId) {
      return DocumentReferences.find();
    } else {
      return [];
    }
  });
}



DocumentReferenceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "DocumentReference"
  },
  "masterIdentifierSchema" : {
    optional: true,
    type: IdentifierSchema
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "subject" : {
    optional: true,
    type: ReferenceSchema
  },
  "type" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "class" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "author" : {
    optional: true,
    type: [ ReferenceSchema ]
  },
  "custodian" : {
    optional: true,
    type: ReferenceSchema
  },
  "authenticator" : {
    optional: true,
    type: ReferenceSchema
  },
  "created" : {
    optional: true,
    type: Date
  },
  "indexed" : {
    optional: true,
    type: Date
  },
  "status" : {
    optional: true,
    type: String
  },
  "docStatus" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "relatesTo.$.code" : {
    optional: true,
    type: String
  },
  "relatesTo.$.target" : {
    optional: true,
    type: ReferenceSchema
  },
  "description" : {
    optional: true,
    type: String
  },
  "securityLabel" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "content.$.attachment" : {
    optional: true,
    type: AttachmentSchema
  },
  "content.$.format" : {
    optional: true,
    type: [ CodingSchema ]
  },
  "context.encounter" : {
    optional: true,
    type: ReferenceSchema
  },
  "context.event" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "context.period" : {
    optional: true,
    type: PeriodSchema
  },
  "context.facilityType" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "context.practiceSetting" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "context.sourcePatientInfo" : {
    optional: true,
    type: ReferenceSchema
  },
  "context.related.$.identifier" : {
    optional: true,
    type: IdentifierSchema
  },
  "context.related.$.ref" : {
    optional: true,
    type: ReferenceSchema
  }

});

DocumentReferences.attachSchema(DocumentReferenceSchema);
