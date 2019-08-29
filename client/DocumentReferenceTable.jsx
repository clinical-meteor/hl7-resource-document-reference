import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { HTTP } from 'meteor/http';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

import { Session } from 'meteor/session';
import { has, get } from 'lodash';
import { TableNoData } from 'meteor/clinical:glass-ui'
import PropTypes from 'prop-types';

// import FaFilePdfO from 'react-icons/lib/fa/file-pdf-o';

Session.setDefault('csiGuid', '')
export class DocumentReferenceTable extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        hideOnPhone: {
          visibility: 'visible',
          display: 'table'
        },
        cellHideOnPhone: {
          visibility: 'visible',
          display: 'table',
          paddingTop: '16px'
        },
        cell: {
          paddingTop: '16px'
        }
      },
      selected: [],
      documentReferences: []
    };

    let query = {};
    let options = {
      sort: { indexed: -1 }
    };

    // number of items in the table should be set globally
    if (get(Meteor, 'settings.public.defaults.paginationLimit')) {
      options.limit = get(Meteor, 'settings.public.defaults.paginationLimit');
    }
    // but can be over-ridden by props being more explicit
    if(this.props.limit){
      options.limit = this.props.limit;  
    }

    // data.documentReferences = [];
    data.documentReferences = DocumentReferences.find(query, options).map(function(document){
      let result = {
        _id: document._id,
        id: document.id,
        indexed: moment(get(document, 'indexed', null)).format("YYYY-MM-DD"),
        author: get(document, 'author.0.display', ''),
        description: get(document, 'description', ''),
        identifierValue: get(document, 'identifier.0.value', ''),
        attachmentUrl: get(document, 'content.0.attachment.url', ''),
        typeText: get(document, 'type.text', ''),
        typeCode: get(document, 'type.coding.0.code', ''),
        typeDisplay: get(document, 'type.coding.0.display', '')
      };

      return result;
    });

    if (Session.get('appWidth') < 768) {
      data.style.hideOnPhone.visibility = 'hidden';
      data.style.hideOnPhone.display = 'none';
      data.style.cellHideOnPhone.visibility = 'hidden';
      data.style.cellHideOnPhone.display = 'none';
    } else {
      data.style.hideOnPhone.visibility = 'visible';
      data.style.hideOnPhone.display = 'table-cell';
      data.style.cellHideOnPhone.visibility = 'visible';
      data.style.cellHideOnPhone.display = 'table-cell';
    }

    return data;
  }
  rowClick(id){
    Session.set('documentReferencesUpsert', false);
    Session.set('selectedDocumentReference', id);
    Session.set('documentReferencePageTabIndex', 2);
  }
  handleVerify(documentReference){
    console.log('handleVerify', documentReference);
    
    HTTP.get('https://poc-node-1.fhirblocks.io/smoac/audit/validate', {
      "csiGuid": Session.get('csiGuid'),
      "signature": get(documentReference, 'signatureBlob')
    }, function(error, result){
      if(error){
        alert('Error!  Something wrong happened.  :( /nThis is extremely likely a 500 Internal Server Error')
      }
      if(result){
        if(result.valid === true){
          alert('Valid!  This signature was found matched to this self-soverign identifier on the blockchain.')
        } else if(result.valid === false){
          alert("Not valid.  Either the signature or the self-soverign identifier weren't found.  A match couldn't be made. ")
        }
      }
    })
    
  }
  renderVerify(documentReference){
    if (!this.props.hideVerify) {
      return (
        <td className='revoke'>
          <FlatButton label="Verify" onClick={this.handleVerify.bind(this, documentReference)} />
        </td>
      );
    }
  }
  renderVerifyHeader(){
    if (!this.props.hideVerify) {
      return (
        <th className='end' style={{minWidth: '100px', marginLeft: '20px'}}> Verify </th>
      );
    }
  }
  render () {
    let tableRows = [];
    let footer;

    if(this.data.documentReferences.length === 0){
      if(!(this.props.noDataMessage === false)){
        footer = <TableNoData noDataPadding={ this.props.noDataMessagePadding } />
      }
    } else {
      for (var i = 0; i < this.data.documentReferences.length; i++) {
        tableRows.push(
          <tr key={i} className="documentReferenceRow" style={{cursor: "pointer"}}>
            <td className='indexed' onClick={ this.rowClick.bind('this', this.data.documentReferences[i]._id)} style={{minWidth: '100px', paddingTop: '16px'}}>{this.data.documentReferences[i].indexed }</td>
            <td className='author' onClick={ this.rowClick.bind('this', this.data.documentReferences[i]._id)} style={this.data.style.cell}>{this.data.documentReferences[i].author }</td>
            <td className='description' style={this.data.style.cellHideOnPhone}>{this.data.documentReferences[i].description}</td>
            <td className='identifierValue' style={this.data.style.cellHideOnPhone}>{this.data.documentReferences[i].identifierValue }</td>
            <td className='attachmentUrl' style={this.data.style.cellHideOnPhone}>{this.data.documentReferences[i].attachmentUrl}</td>
            <td className='typeText' style={this.data.style.cellHideOnPhone}>{this.data.documentReferences[i].typeText}</td>
            <td className='typeCode' style={this.data.style.cellHideOnPhone}>{this.data.documentReferences[i].typeCode}</td>
            <td className='typeDisplay' style={this.data.style.cellHideOnPhone}>{this.data.documentReferences[i].typeDisplay}</td>
          </tr>
        );
      }
    }

    return(
      <div>
        <Table id='documentReferencesTable' hover >
          <thead>
            <tr>

              <th className='indexed' style={{minWidth: '100px'}}>Indexed Date</th>
              <th className='author' style={this.data.style.cellHideOnPhone} >Author</th>
              <th className='description' style={this.data.style.cellHideOnPhone} >Description</th>
              <th className='identifierValue' style={this.data.style.cellHideOnPhone} >IdentifierValue</th>
              <th className='attachmentUrl' style={this.data.style.cellHideOnPhone} >AttachmentUrl</th>
              <th className='typeText' style={this.data.style.cellHideOnPhone} >Type Text</th>
              <th className='typeCode' style={this.data.style.cellHideOnPhone} >Code</th>
              <th className='typeDisplay' style={this.data.style.cellHideOnPhone} >Display</th>
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
        { footer }
      </div>
    );
  }
}

DocumentReferenceTable.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,
  hideVerify: PropTypes.bool,
  limit: PropTypes.number
};

ReactMixin(DocumentReferenceTable.prototype, ReactMeteorData);
export default DocumentReferenceTable;