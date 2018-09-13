import React from "react";

import {Image, Glyphicon, Grid, Row, Col, FormGroup, Checkbox} from "react-bootstrap";

const tableStyle = {
    fontSize: '11px',
    border: 'none'
};
const productImage = {
    width: '200px'
};
const tdStyle = {
    padding: '2px',
    border: 'none',
    textTransform: 'capitalize',
    fontWeight: 'bold'

};
const tdStyle_ = {
    padding: '2px', textTransform: 'capitalize',
    border: 'none'
};
const rowStyle = {
    display:'flex',
    borderTop: 'solid 1px #eee',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'solid 1px #eee',
};
const blue ={
    color: '#2196f3',
    cursor: 'pointer'
}
const badgeStyle = {
    width: '25px',
};
const price={
    fontWeight:'bold',
}
let backgrounded = {
    backgroundColor: '#eee',
    borderTop: 'solid 1px #fff'
};
let rstyle = {};
const title={

}
let grey = {color: '#ddd',fontSize:'10px', fontWeight:'normal'};
class Mtable extends React.Component {
    constructor(props) {
        super(props);
        this.createTable = this.createTable.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.change = this.change.bind(this);
    }

    change(e, i) {

        if (e !== undefined) {
            !e.target.checked ? this.removeItem(e, this.props.data, i, this.props.remove) : this.addItem(e, this.props.data, i, this.props.remove);
        }
        debugger
    }

    removeItem(e, data, who, remove) {
        e.preventDefault();

        this.props.appActions.remove(data, remove, who)
    }

    addItem(e, data, who, remove) {
        this.props.appActions.add(data, remove, who);
    }

    createTable(data, remove) {
        let child = [];
        let header = Object.keys(data.length > 0 ? data[0] : {});
        let items = data;
        header = header.filter(item => item !== "productImage");
        header.unshift("productImage");
        let selprod = [];
        selprod.push(<span style={blue}>Je selectie</span>);
        data.map((item, i) =>
            selprod.push(
                <FormGroup key={'cbs' + i}> <Checkbox onChange={(e) => this.change(e, i)}
                                                      defaultChecked><span className='hidden-sm hidden-xs' style={title}>{item.name}</span></Checkbox> </FormGroup>)
        )
        remove.map((item, i) =>
            selprod.push(
                <FormGroup key={'cb' + i}> <Checkbox onChange={(e) => this.change(e, i)}
                                                     bsStyle="info"><span className='hidden-sm hidden-xs' style={title}>{item.name}</span></Checkbox> </FormGroup>)
        )

        for (let a = 0; a < header.length; a++) {
            let children = [];

            children.push(<Col lg={2} xs={4} style={tdStyle_}
                               key={'t' + a}>{header[a] === "productImage" ? selprod : header[a]}</Col>);
            let check = [];
            for (let b = 0; b < items.length; b++) {
                let hijo = items[b][header[a]];

                if (header[a] === 'badges') {
                    let aux = [];
                    hijo.split("|").map((s, i) =>
                        aux.push(<Image key={'p' + i} src={s} style={badgeStyle}/>)
                    )
                    children.push(<Col lg={2} xs={4} style={tdStyle}
                                       key={b.toString() + '-' + a.toString()}>
                        {aux}</Col>);
                } else if (header[a] === 'productImage') {
                    children.push(<Col lg={2} xs={4} style={tdStyle}
                                       key={b.toString() + '-' + a.toString()}>
                       <Glyphicon
                            onClick={(e) => this.removeItem(e, data, b, remove)}  style={blue}  key={"g" + a} className='pull-right' glyph="trash"
                        /><Image className="img-responsive"
                        style={productImage} key={'img' + b + a} src={hijo}/>
                        <p style={blue}> {items[b]['name']}</p>
                        <p style={price}>{items[b]['salePrice']}</p>
                        <p style={grey}>per stuk / excl</p>
                    </Col>);
                }
                else {
                    if (hijo !== ''){check.push(hijo)};
                    if (typeof (hijo) === 'object') {
                        hijo = '';
                    }
                    else if (typeof (hijo) === 'boolean') {
                        hijo ? hijo = (<Glyphicon glyph="ok"/>) : hijo = (<Glyphicon glyph="remove"/>);
                    }
                    children.push(<Col lg={2} xs={4} style={tdStyle}
                                       key={b.toString() + '-' + a.toString()}>
                        {hijo}</Col>);
                }
            }
            if (check.length > 0 && !!check.reduce(function (a, b) {
                    return (a === b) ? a : NaN;
                })) {
                rstyle = backgrounded;
            } else {
                rstyle = rowStyle
            }
            child.push(<Row key={a.toString()} style={rstyle}>{children}</Row>);
        }
        return child;
    }

    render() {
        const {data, remove} = this.props;

        return (
            <div key={'t' + data.length} style={tableStyle}>
                <Grid key={'tb' + data.length}>
                    <Row>
                        <Col lg={4}><h3 style={blue}><strong>{this.props.data.length} produkten vergelijken</strong></h3></Col>
                    </Row>
                    {this.createTable(data, remove)}
                </Grid>
            </div>)
    }
}

export default Mtable;