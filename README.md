##clinical:hl7-resource-document-reference

HL7 FHIR Resource - DocumentReference


===============================
#### Conformance Statement  

The resource in this package implements the FHIR Patient Resource schema provided at  [https://www.hl7.org/fhir/documentreference.html](https://www.hl7.org/fhir/documentreference.html).  


===============================
#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-document-reference

# to initialize default data
INITIALIZE=true meteor
````

===============================
#### Example   

```js
var driversLicensePhotocopy = {}
DocumentReferences.insert(driversLicensePhotocopy);
```

===============================
#### Extending the Schema

```js
ExtendedDocumentReferenceSchema = new SimpleSchema([
  DocumentReferenceSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
DocumentReferences.attachSchema( ExtendedDocumentReferenceSchema );
```



===============================
#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).




===============================
#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
