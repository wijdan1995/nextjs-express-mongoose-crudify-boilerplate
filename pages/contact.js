import Layout from '../components/Layout'
import styled from "styled-components";
import { withTranslation } from '../i18n';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import reduxApi, { withReduxEndpoints } from '../redux/reduxApi.js'


class contact extends Component {
    state = {
        name: '',
        email: '',
        message: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        const formData = this.state
        if (!formData) return
        const callbackWhenDone = () => this.setState({
            name: '',
            email: '',
            message: ''
            , inProgress: false
        })
        this.setState({ inProgress: true })
        // Actual data request
        const newContact = formData
        this.props.dispatch(reduxApi.actions.contacts.post({}, { body: JSON.stringify(newContact) }, callbackWhenDone))

    }
    render() {

        return (
            <Layout>
                <p>{this.props.t('contact-text')}</p>

                <Form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">{this.props.t('name')}</label>
                        <input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="email">{this.props.t('email')}</label>
                        <input type="email" id="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="message">{this.props.t('message')}</label>
                        <textarea id="message" value={this.state.message} onChange={this.handleChange} />
                    </div>
                    <br />
                    <Button>{this.props.t('contact-button')}</Button>

                    {(this.state.inProgress ? <p>Thank you, We'll contact you soon.</p> : "")}
                </Form>

            </Layout>
        )
    }

}
const Form = styled.form`
background-color:#f9f9f9;
border-radius:5px;
padding:20px;
input,textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
`


const Button = styled.button`
background-color:pink;
text-decoration:none;
cursor:pointer;
color:#4c393c;
border-radius:5px;
padding:5px;
border: none;
width: 100%;
`

contact.getInitialProps = async () => ({
    namespacesRequired: ['common', 'contact'],
})

contact.propTypes = {
    t: PropTypes.func.isRequired,
}


export default withReduxEndpoints(withTranslation('contact')(contact))
