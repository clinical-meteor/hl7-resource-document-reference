import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
import { GlassCard, Glass, VerticalCanvas, FullPageCanvas } from 'meteor/clinical:glass-ui';
import DocumentReferenceDetail from './DocumentReferenceDetail';
import DocumentReferenceTable from './DocumentReferenceTable';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { Session } from 'meteor/session';

let defaultDocumentReference = {
  index: 2,
  id: '',
  username: '',
  email: '',
  given: '',
  family: '',
  gender: ''
};
Session.setDefault('documentReferenceFormData', defaultDocumentReference);
Session.setDefault('documentReferenceSearchFilter', '');

export class DocumentReferencesPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('documentReferencePageTabIndex'),
      documentReference: defaultDocumentReference,
      documentReferenceSearchFilter: '',
      currentDocumentReference: null
    };

    if (Session.get('documentReferenceFormData')) {
      data.documentReference = Session.get('documentReferenceFormData');
    }
    if (Session.get('documentReferenceSearchFilter')) {
      data.documentReferenceSearchFilter = Session.get('documentReferenceSearchFilter');
    }
    if (Session.get("selectedDocumentReference")) {
      data.currentDocumentReference = Session.get("selectedDocumentReference");
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("DocumentReferencesPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('documentReferencePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedDocumentReference', false);
    Session.set('documentReferenceUpsert', false);
  }

  render() {
    console.log('React.version: ' + React.version);
    return (
      <div id="documentReferencesPage">
        <FullPageCanvas>
          <GlassCard height="auto">
            <CardTitle
              title="DocumentReferences"
            />
            <CardText>
              <DocumentReferenceTable showBarcodes={true} />

              {/* <Tabs id='documentReferencesPageTabs' default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
                 <Tab className="newDocumentReferenceTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                   <DocumentReferenceDetail id='newDocumentReference' />
                 </Tab>
                 <Tab className="documentReferenceListTab" label='DocumentReferences' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                   <DocumentReferenceTable showBarcodes={true} />
                 </Tab>
                 <Tab className="documentReferenceDetailTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                   <DocumentReferenceDetail id='documentReferenceDetails' currentDocumentReference={this.data.currentDocumentReference} />
                 </Tab>
             </Tabs> */}


            </CardText>
          </GlassCard>
        </FullPageCanvas>
      </div>
    );
  }
}



ReactMixin(DocumentReferencesPage.prototype, ReactMeteorData);

export default DocumentReferencesPage;