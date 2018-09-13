import React  from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../actions/appActions";
import { Col, Row } from "react-bootstrap";
import Mtable from './Mtable';
const blue ={
    color: '#2196f3'
}
class App extends React.Component {

  componentWillMount() {
    this.props.appActions.fetchData();
  }

  render() {
          return (<div>
                <Row>
                  <Col lg={10} lgPush={1} className="table-responsive">
                  <Mtable {...this.props}/>
                  </Col>
                </Row>
              </div>
          );
      }
}
function mapStateToProps(state) {
  return {
    data: state.appRed.data,
    remove: state.appRed.remove
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
