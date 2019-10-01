import Navbar from './Navbar'
import styled, { createGlobalStyle } from "styled-components";
import { i18n, withTranslation } from '../i18n';
import PropTypes from 'prop-types'

const GlobalStyle = createGlobalStyle`
body{
    padding:0;
    margin:0;
    font-family: serif;
}
`;


const Layout = props => {
    const { t } = props
    const lng = i18n.language
    return (
        <Container lng={lng} >
            <GlobalStyle />
            {/* pass the lng and t to the nav to use it there again */}
            <Navbar lng={lng} t={t} />
            <Warpper>{props.children}</Warpper>
        </Container>
    )
}

Layout.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Layout)

const Warpper = styled.div`
padding:10%;
margin:5%;
text-align:center;
color:gray;
background-color: #fff;
`


const Container = styled.div`
height: 100vh;
background-color: #FDE4E4;
padding:5%;
direction: ${props => props.lng === 'ar' ? "rtl" : "initial"}
`
