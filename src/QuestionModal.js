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
    componentWillUnmount() {
        let newArr = this.state.nameValueSetToSearch;
        if (this.props.deletedItem) {
            newArr = newArr.filter(item => item.itemName !== this.props.deletedItem.itemName);
            // let newArr = [1, 2, 3];
            // console.log(this.props.handleDeletedItem);
            // if (this.props.handleDeletedItem.length > 0) {
            //     // console.log(this.props.handleDeletedItem);
            //     newArr = await this.props.handleDeletedItem.map(item => newArr.filter(symptom => symptom.itemName !== item.itemName))
            //     // console.log(newArr);
            //     this.setState({ nameValueSetToSearch: newArr })
            // }
            // console.log(this.state.nameValueSetToSearch);
            // console.log(arr);
            this.setState({
                nameValueSetToSearch: newArr
            })
            this.props.getDataArray(newArr)
        }
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

    handleDelete = (arr) => {
        if (this.state.show === false) {
            console.log(this.props.deletedItems.map(id => id));
            if (this.props.deletedItems.length > 0) {
                // const newArray = this.props.deletedItems.map(itemId => arr.filter(symptom => (symptom.itemId !== itemId)))
                let newArray = arr.filter(item => !this.props.deletedItems.includes(item.itemId))
                console.log(newArray);
                // let newArray = new Set();
                // for (let i = 0; i < this.props.deletedItems.length; ++i) {
                //     newArray.addarr.filter(item => this.props.deletedItems[i] !== item.itemId)
                // }
                // const newArray = arr.filter(item => item.itemId !== this.props.deletedItems.map(id => id))
                // console.log(newArray);
                console.log(arr);
                console.log(newArray);
                return newArray
            }
        }
        return arr;
    }

    handleSave = async () => {
        await this.setState({
            nameValueSetToSearch: [...this.state.nameValueSetToSearch, { itemName: this.props.item.name, itemValue: this.state.inputValue, itemDescription: this.state.choiceDescription, itemId: uuidv4() }],
            show: false,
            inputValue: '',
            choiceDescription: ''
        })
        let newArr = this.state.nameValueSetToSearch;
        // console.log(newArr);
        // console.log(this.props.deletedItems.map(item => newArr.filter(symptom => symptom.itemName !== item))[this.props.deletedItems]);
        // this.props.getDataArray(newArr)
        await this.setState({ nameValueSetToSearch: this.handleDelete(newArr) })
        this.props.getDataArray(this.state.nameValueSetToSearch)



    }
    // if(this.props.handleDeletedItem) {
    //     let prevArr = this.state.nameValueSetToSearch

    //     this.setState({ nameValueSetToSearch: prevArr })
    // }

    render() {

        // this.props.handleDeletedItem = (deletedItem) => {
        //     this.state.nameValueSetToSearch.filter(symptom => symptom.itemId !== deletedItem.itemId)

        // }
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