
import DocumentReferencesPage from './client/DocumentReferencesPage';
import DocumentReferenceTable from './client/DocumentReferenceTable';
import DocumentReferenceDetail from './client/DocumentReferenceDetail';

var DynamicRoutes = [{
  'name': 'DocumentReferencePage',
  'path': '/document-references',
  'component': DocumentReferencesPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'DocumentReferences',
  'to': '/document-references',
  'href': '/document-references'
}];
var AdminSidebarElements = [{
  'primaryText': 'DocumentReferences',
  'to': '/document-references',
  'href': '/document-references'
}];

export { 
  SidebarElements, 
  AdminSidebarElements,
  DynamicRoutes, 

  DocumentReferencesPage,
  DocumentReferenceTable
};


