import styled from "styled-components";
import PropTypes from 'prop-types'

//i18n
import { i18n, withTranslation, Link } from '../i18n';
const Navbar = ({ t, lng }) => {
    return (
        <nav>
            <Link href='/'><NavLink>{t('home')}</NavLink></Link>
            <Link href='/about'><NavLink>{t('about')}</NavLink></Link>
            <Link href='/contact'><NavLink>{t('contact')}</NavLink></Link>
            <Button lng={lng}
                onClick={() => i18n.changeLanguage(lng === 'en' ? 'ar' : 'en')}
            >
                {t('change-lang')}
            </Button>
        </nav>
    )
}

const NavLink = styled.a`
margin:0 20px ;
font-size: 1.5rem;
cursor: pointer;
color: #4c393c;
border:none;

`

const Button = styled.a`
background-color:pink;
text-decoration:none;
cursor:pointer;
color:#4c393c;
border-radius:5px;
padding:3px;
float:${props => props.lng === 'ar' ? 'left' : 'right'};
`

Navbar.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Navbar)
