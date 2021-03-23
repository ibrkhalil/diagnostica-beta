import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
class QuestionModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            item: this.props.item,
            nameValueSetToSearch: [],
            inputValue: "",
            choiceDescription: ""
        }
        this.wrapper = React.createRef()
    }
    handleInputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleClick = async (value, choiceDescription) => {
        await this.setState({
            inputValue: value,
            choiceDescription
        })
        this.handleSave()
        // console.log(value);
    }



    handleSave = async () => {
        await this.setState({
            nameValueSetToSearch: [...this.state.nameValueSetToSearch, { itemName: this.props.item.name, itemValue: this.state.inputValue, itemDescription: this.state.choiceDescription }],
            show: false,
            inputValue: '',
            choiceDescription: ''
        })
        let arr = this.state.nameValueSetToSearch;
        this.props.getDataArray(arr)
    }

    render() {


        const handleClose = () => { this.setState({ show: false, inputValue: '' }) }
        const handleShow = () => { this.setState({ show: true }) }


        const item = this.props.item

        return (
            <div ref={this.wrapper}>
                <Button variant="primary" onClick={handleShow}>Question About {item.name}</Button>

                <Modal animation={false} show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{item.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><>{item.laytext}</> <br /> {item.hasOwnProperty('choices') ?
                        item.choices.map(choice => <Button key={uuidv4()} onClick={() => { this.handleClick(choice.value, choice.laytext) }}>{choice.laytext}</Button>) : <input onChange={this.handleInputChange} value={this.state.inputValue} type='number' placeholder={item.min + " to " + item.max} />}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default QuestionModal