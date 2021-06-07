import React, { Component } from "react";
import { joinRoom } from "../../http-calls";

class JoinRoom extends Component {
  state = {
    formFields: {
      roomId: {
        value: "",
        isValid: false,
        isDirty: false,
      },
      userName: {
        value: "",
        isValid: false,
        isDirty: false,
      },
    },
    isFormValid: false,
    redirectTo: null,
    errorText: "",
    isLoading: false,
  };

  _markAsDirty = (fieldName) => {
    const { formFields } = this.state;
    formFields[fieldName].isDirty = true;
    this.setState({ formFields }, () => {
      this._validateForm();
    });
  };

  _toggleLoader = (isLoading) => {
    this.setState({ isLoading });
  };

  _showError = (errorText) => {
    this.setState({ errorText });
  };

  _hideError = () => {
    this.setState({ errorText: "" });
  };

  _updateFieldValue = (fieldName, value) => {
    const { formFields } = this.state;
    formFields[fieldName].value = value;
    this.setState({ formFields });
    if (formFields[fieldName].isDirty) {
      // Validate
      this._validateForm();
    }
  };

  _validateForm = () => {
    return new Promise((resolve, reject) => {
      const { formFields } = this.state;
      let isFormValid = true;
      Object.keys(formFields).forEach((fieldName, index) => {
        if (isFormValid && formFields[fieldName].isDirty) {
          switch (fieldName) {
            case "userName": {
              if (formFields.userName.value.length >= 1) {
                formFields.userName.isValid = true;
                this._hideError();
              } else {
                formFields.userName.isValid = false;
                isFormValid = false;
                this._showError("Please enter a valid User Name");
              }
              break;
            }
            case "roomId": {
              if (formFields.roomId.value.length >= 1) {
                this._hideError();
                formFields.roomId.isValid = true;
              } else {
                formFields.roomId.isValid = false;
                isFormValid = false;
                this._showError("Please enter a valid Room Id");
              }
              break;
            }
          }
        }
      });
      this.setState({ formFields, isFormValid }, () => {
        resolve();
      });
    });
  };

  _makeAllFieldDirty = () => {
    return new Promise((resolve, reject) => {
      const { formFields } = this.state;
      Object.keys(formFields).forEach((fieldName, index) => {
        formFields[fieldName].isDirty = true;
      });
      this.setState({ formFields }, () => {
        resolve();
      });
    });
  };

  _validateAndSubmit = async (e) => {
    e.preventDefault();
    await this._makeAllFieldDirty();
    await this._validateForm();
    const { formFields, isFormValid } = this.state;
    if (isFormValid) {
      try {
        this._toggleLoader(true);
        const payload = {
          "userName": formFields.userName.value,
          "roomId": formFields.roomId.value
        }
        const roomResponse = await joinRoom(payload);
        console.log('roomResponse :>> ', roomResponse);
        this._toggleLoader(false);
      } catch (loginError) {
        console.log('loginError :>> ', loginError);
        this._toggleLoader(false);
        if (loginError && loginError.errorMessage && loginError.errorMessage.length) {
          this._showError(loginError.errorMessage);
        } else {
          this._showError("Not allowed to join the room");
        }
      }
    }
  };

  render() {
    const { errorText, formFields, isLoading } = this.state;

    return (
      <form className="tabContent" onSubmit={this._validateAndSubmit}>
        <div className="inputWrapper">
          <div className="label">Room Id</div>
          <input
            type="text"
            value={formFields.roomId.value}
            disabled={isLoading}
            onChange={(e) => this._updateFieldValue("roomId", e.target.value)}
            onBlur={() => this._markAsDirty("roomId")}
          />
        </div>
        <div className="inputWrapper">
          <div className="label">User Name</div>
          <input
            type="text"
            value={formFields.userName.value}
            disabled={isLoading}
            onChange={(e) => this._updateFieldValue("userName", e.target.value)}
            onBlur={() => this._markAsDirty("userName")}
          />
        </div>
        {isLoading ? (
          <div className="progressViewer">Please wait</div>
        ) : (
          <button className="submitBtn" type="submit">
            Join
          </button>
        )}
        <p className="errorText">{errorText}</p>
      </form>
    );
  }
}

export default JoinRoom;
