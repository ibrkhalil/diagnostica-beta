import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Logo from "../logos/DiagnosticaSampleLogo.svg";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles

// import "react-notifications/lib/notifications.css";

// import Alert from "react-bootstrap/Alert";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
const options = {
  message: "My alert message",
  style: {
    backgroundColor: "cornflowerblue",
    borderRadius: 0,
  },
  offset: "50px",
  position: "top right",
  duration: 0,
};

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        err: {},
      },
    };
  }

  passwordVisibility = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    // if (formValid(this.state)) {
    //     console.log`
    //   --SUBMITTING--
    //   First Name: ${this.state.firstName}
    //   Last Name: ${this.state.lastName}
    //   Email: ${this.state.email}
    //   Password: ${this.state.password}
    // `;
    await axios
      .post(
        `http://localhost:8000/api/register?email=${this.state.email}&password=${this.state.password}&username=${this.state.username}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => this.setState({ err: err.response.status }));
    console.log(this.state.err);
    this.showErrorToast();
    // } else {
    //   console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    // }
  };
  showErrorToast = () => {
    if (this.state.err === 500) {
      console.log(this.state.err);
      toaster.notify("Email is Already in use ! 😢", {
        position: "bottom-left", // top-left, top, top-right, bottom-left, bottom, bottom-right
        duration: 3000, // This notification will not automatically close
      });
    } else {
      this.setState({ err: {} });
      toaster.notify("User Successfully Registered ! 🕺❤", {
        position: "bottom-left", // top-left, top, top-right, bottom-left, bottom, bottom-right
        duration: 3000, // This notification will not automatically close
      });
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      [name]: value,
    }); /*, () => console.log(this.state));*/
  };
  render() {
    const { formErrors, showPassword } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='loginForm' noValidate>
          <img className='logo' src={Logo} alt='' />

          <div className='textInput wcard'>
            <input
              className={formErrors.firstName.length > 0 ? "error" : null}
              placeholder='Username'
              type='text'
              name='username'
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.firstName.length > 0 && (
              <span className='errorMessage'>{formErrors.firstName}</span>
            )}
          </div>
          <div className='textInput wcard'>
            {/* <input
                            className={formErrors.lastName.length > 0 ? "error" : null}
                            placeholder="Last Name"
                            type="text"
                            name="lastName"
                            noValidate
                            onChange={this.handleChange}
                        /> */}
            {formErrors.lastName.length > 0 && (
              <span className='errorMessage'>{formErrors.lastName}</span>
            )}
          </div>
          <div className='textInput wcard'>
            <input
              className={formErrors.email.length > 0 ? "error" : null}
              placeholder='Email'
              type='email'
              name='email'
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className='errorMessage'>{formErrors.email}</span>
            )}
          </div>
          <div className='textInput wcard'>
            <input
              className={formErrors.password.length > 0 ? "error" : null}
              placeholder='Password'
              type={showPassword ? "text" : "password"}
              name='password'
              noValidate
              onChange={this.handleChange}
            />
            <span className='Eye'>
              <i
                className='fas fa-eye pass-icon'
                onClick={this.passwordVisibility}
              ></i>
            </span>

            {formErrors.password.length > 0 && (
              <span className='errorMessage'>{formErrors.password}</span>
            )}
          </div>
          <div className='column'>
            <div className='col wcard social'>
              <input
                className='btn'
                type='submit'
                name=''
                value='Create Account'
                noValidate
              />
            </div>

            <div className='col wcard social'>
              {/* <Link to='/Login' className="white-text">Already Have an Account?</Link> */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Registration;
