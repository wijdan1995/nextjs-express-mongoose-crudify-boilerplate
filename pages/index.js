import Layout from '../components/Layout'
import styled from "styled-components";

// i18n
import { withTranslation } from '../i18n';
import PropTypes from 'prop-types'


const Home = ({ t }) => {
  return (
    <Layout>
      <Title>{t('welcome')}</Title>
      <Text>{t('home-text')}</Text>
    </Layout>
  )
}

const Title = styled.h1`
  text-align: center;
  color: palevioletred;
`;

const Text = styled.p`
  text-align: center;
  color: gray;
`;

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Home.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Home)

