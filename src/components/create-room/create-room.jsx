import React, { Component } from "react";
import { createRoom } from "../../http-calls";
import { connect } from "react-redux";
import { updateUserData } from "../../redux/actions/user-data";
import SocketHelper from "../../socket-helper";

class CreateRoom extends Component {
  state = {
    formFields: {
      userName: {
        value: "",
        isValid: false,
        isDirty: false,
      },
      userCount: {
        value: 2,
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
            case "userCount": {
              console.log(
                "formFields.userCount.value :>> ",
                formFields.userCount.value
              );
              if (formFields.userCount.value > 1) {
                this._hideError();
                formFields.userCount.isValid = true;
              } else {
                formFields.userCount.isValid = false;
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
          "userCount": formFields.userCount.value
        }
        const roomResponse = await createRoom(payload);
        // Successfully connected
        const currentUser = roomResponse.data.newRoom.users.find(user => user.userName === formFields.userName.value); 
        this.props.updateUserData({
          ...roomResponse.data.newRoom,
          currentUser
        })
        // Establish socket connection
        SocketHelper.connect(roomResponse.data.newRoom.roomId, currentUser.userName);
        // Load game page
        this.props.loadGamePage();
        this._toggleLoader(false);
      } catch (loginError) {
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
          <div className="label">User Name</div>
          <input
            type="text"
            value={formFields.userName.value}
            disabled={isLoading}
            onChange={(e) => this._updateFieldValue("userName", e.target.value)}
            onBlur={() => this._markAsDirty("userName")}
          />
        </div>
        <div className="inputWrapper">
          <div className="label">User Count</div>
          <select
            name="userCount"
            id="userCount"
            value={formFields.userCount.value}
            disabled={isLoading}
            onChange={(e) =>
              this._updateFieldValue("userCount", e.target.value)
            }
            onBlur={() => this._markAsDirty("userCount")}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        {isLoading ? (
          <div className="progressViewer">Please wait</div>
        ) : (
          <button className="submitBtn" type="submit">
            Create
          </button>
        )}
        <p className="errorText">{errorText}</p>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: userData => dispatch(updateUserData(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoom);