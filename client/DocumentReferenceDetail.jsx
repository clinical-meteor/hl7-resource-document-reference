import { CardActions, CardText, SelectField, MenuItem, TextField, RaisedButton } from 'material-ui';

import { get, has, set } from 'lodash';

import { Bert } from 'meteor/clinical:alert';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { Session } from 'meteor/session';


let defaultDocumentReference = {
  "resourceType" : "DocumentReference",
  "name" : [{
    "text" : "",
    "resourceType" : "HumanName"
  }],
  "active" : true,
  "gender" : "",
  "birthDate" : '',
  "photo" : [{
    url: ""
  }],
  identifier: [{
    "use": "usual",
    "type": {
      "coding": [
        {
          "system": "http://hl7.org/fhir/v2/0203",
          "code": "MR"
        }
      ]
    },
    "value": ""
  }],
  "test" : false
};


Session.setDefault('documentReferenceUpsert', false);
Session.setDefault('selectedDocumentReference', false);

export class DocumentReferenceDetail extends React.Component {
  getMeteorData() {
    let data = {
      customWidth: {
        width: 150
      },
      documentReferenceId: false,
      documentReference: defaultDocumentReference
    };

    if (Session.get('documentReferenceUpsert')) {
      data.documentReference = Session.get('documentReferenceUpsert');
    } else {
      if (Session.get('selectedDocumentReference')) {
        data.documentReferenceId = Session.get('selectedDocumentReference');
        console.log("selectedDocumentReference", Session.get('selectedDocumentReference'));

        let selectedDocumentReference = DocumentReferences.findOne({_id: Session.get('selectedDocumentReference')});
        console.log("selectedDocumentReference", selectedDocumentReference);

        if (selectedDocumentReference) {
          data.documentReference = selectedDocumentReference;

          if (typeof selectedDocumentReference.birthDate === "object") {
            data.documentReference.birthDate = moment(selectedDocumentReference.birthDate).add(1, 'day').format("YYYY-MM-DD");
          }
        }
      } else {
        data.documentReference = defaultDocumentReference;
      }
    }

    if(process.env.NODE_ENV === "test") console.log("DocumentReferenceDetail[data]", data);
    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="documentReferenceDetail">
        <CardText>
          <SelectField
            floatingLabelText="Type"
            value={1}
            fullWidth
          >
            <MenuItem value={1} primaryText="Power of Attorney" />
          </SelectField><br/>
          <TextField
            id='subjectInput'
            ref='subject'
            name='subject'
            floatingLabelText='Full Name of Subject (i.e. Patient)'
            hintText='Jason Argonaut'
            // value={ get(this, 'data.documentReference.name[0].text', '')}
            // onChange={ this.changeState.bind(this, 'name')}
            fullWidth
            /><br/>
          <TextField
            id='agentNameInput'
            ref='agentName'
            name='agentName'
            floatingLabelText='Full Name of Agent'
            hintText='agent name'
            // value={ get(this, 'data.documentReference.gender', '')}
            // onChange={ this.changeState.bind(this, 'gender')}
            fullWidth
            /><br/>
          <TextField
            id='issuedDateInput'
            ref='issuedDate'
            name='issuedDate'
            floatingLabelText='Issued Date'
            hintText='YYYY-MM-DD'
            // value={ get(this, 'data.documentReference.birthDate', '')}
            // onChange={ this.changeState.bind(this, 'birthDate')}
            fullWidth
            /><br/>       
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.documentReferenceId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(documentReferenceId){
    if (documentReferenceId) {
      return (
        <div>
          <RaisedButton id='saveDocumentReferenceButton' className='saveDocumentReferenceButton' label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <div>
          <RaisedButton id='previewDocumentReferenceButton'  className='saveDocumentReferenceButton' label="Preview" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton id='cancelDocumentReferenceButton'  className='saveDocumentReferenceButton' label="Cencel" primary={false} onClick={this.handleCancelButton.bind(this)} />
        </div>
      );
    }
  }

  changeState(field, event, value){
    let documentReferenceUpdate;

    if(process.env.TRACE) console.log("documentReferenceDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new documentReference
    if (Session.get('documentReferenceUpsert')) {
      documentReferenceUpdate = Session.get('documentReferenceUpsert');
    } else {
      documentReferenceUpdate = defaultDocumentReference;
    }



    // if there's an existing documentReference, use them
    if (Session.get('selectedDocumentReference')) {
      documentReferenceUpdate = this.data.documentReference;
    }

    switch (field) {
      case "name":
        documentReferenceUpdate.name[0].text = value;
        break;
      case "gender":
        documentReferenceUpdate.gender = value.toLowerCase();
        break;
      case "birthDate":
        documentReferenceUpdate.birthDate = value;
        break;
      case "photo":
        documentReferenceUpdate.photo[0].url = value;
        break;
      case "mrn":
        documentReferenceUpdate.identifier[0].value = value;
        break;
      default:

    }
    // documentReferenceUpdate[field] = value;
    process.env.TRACE && console.log("documentReferenceUpdate", documentReferenceUpdate);

    Session.set('documentReferenceUpsert', documentReferenceUpdate);
  }


  // this could be a mixin
  handleSaveButton(){
    if(process.env.NODE_ENV === "test") console.log('handleSaveButton()');
    let documentReferenceUpdate = Session.get('documentReferenceUpsert', documentReferenceUpdate);


    if (documentReferenceUpdate.birthDate) {
      documentReferenceUpdate.birthDate = new Date(documentReferenceUpdate.birthDate);
    }
    if(process.env.NODE_ENV === "test") console.log("documentReferenceUpdate", documentReferenceUpdate);

    if (Session.get('selectedDocumentReference')) {
      if(process.env.NODE_ENV === "test") console.log("Updating documentReference...");

      delete documentReferenceUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      documentReferenceUpdate.resourceType = 'DocumentReference';

      DocumentReferences._collection.update({_id: Session.get('selectedDocumentReference')}, {$set: documentReferenceUpdate }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("DocumentReferences.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "DocumentReferences", recordId: Session.get('selectedDocumentReference')});
          // Session.set('documentReferenceUpdate', defaultDocumentReference);
          Session.set('documentReferenceUpsert', false);
          Session.set('selectedDocumentReference', false);
          Session.set('documentReferencePageTabIndex', 1);
          Bert.alert('DocumentReference added!', 'success');
        }
      });
    } else {
      if(process.env.NODE_ENV === "test") console.log("Creating a new documentReference...", documentReferenceUpdate);

      DocumentReferences._collection.insert(documentReferenceUpdate, function(error, result) {
        if (error) {
          if(process.env.NODE_ENV === "test")  console.log('DocumentReferences.insert[error]', error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "DocumentReferences", recordId: result});
          Session.set('documentReferencePageTabIndex', 1);
          Session.set('selectedDocumentReference', false);
          Session.set('documentReferenceUpsert', false);
          Bert.alert('DocumentReference added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('documentReferencePageTabIndex', 1);
  }

  handleDeleteButton(){
    DocumentReferences._collection.remove({_id: Session.get('selectedDocumentReference')}, function(error, result){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log('DocumentReferences.insert[error]', error);
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "DocumentReferences", recordId: Session.get('selectedDocumentReference')});
        // Session.set('documentReferenceUpdate', defaultDocumentReference);
        Session.set('documentReferenceUpsert', false);
        Session.set('documentReferencePageTabIndex', 1);
        Session.set('selectedDocumentReference', false);
        Bert.alert('DocumentReference removed!', 'success');
      }
    });
  }
}


ReactMixin(DocumentReferenceDetail.prototype, ReactMeteorData);
export default DocumentReferenceDetail;