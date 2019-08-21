import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Leaderboard Player </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Player Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="winnings">Total Winnings</Label>
              <Input
                type="number"
                name="winnings"
                value={this.state.activeItem.winnings}
                onChange={this.handleChange}
                placeholder="Enter Current Winnings"
              />
            </FormGroup>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                type="text"
                name="country"
                value={this.state.activeItem.country}
                onChange={this.handleChange}
                placeholder="Enter Country of Origin"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}